---
title: "Building Intelligent Chatbots with Microsoft Teams Data"
excerpt: "This article discusses how to use the Microsoft Graph API to extract"
date: "2024-04-12"
author: "Mario Guerra"
category: "Artificial Intelligence"
tags: [blog]
blogpost: true
coverImage: "/portfolio-website/images/blog/building-intelligent-chatbots-with-microsoft-teams-data/Teams-Channel-Data-Export-Title-Pic.jpg"
---


## Introduction

In the fast-paced world of software development, good communication is crucial. Since we’re almost entirely remote and distributed across multiple time zones, the Microsoft [TypeSpec](https://typespec.io/) team uses Microsoft Teams channels extensively for our interactions.

Much developer time is spent monitoring these channels and responding to questions from other teams, which takes time away from feature development.

One solution we’re experimenting with is harnessing the Microsoft Graph API to export Teams channel data for use in a Retrieval-Augmented Generation (RAG) enhanced chatbot.

This article describes how we’re doing it, and the relevant scripts described below are [available on my GitHub repo](https://github.com/mario-guerra/teams-channel-content-export).

## Understanding the Microsoft Graph API

The Microsoft Graph API is a tool that allows developers to access and integrate data from various Microsoft services, such as Microsoft 365, Windows, and Enterprise Mobility + Security. Think of it as a bridge connecting different islands of data. With this tool, developers can create applications that can interact with these different data sources, reaching a large number of users and enhancing the features offered by Microsoft 365.

The API provides a single endpoint, https://graph.microsoft.com, for access to rich data and insights within the Microsoft cloud. It includes services that manage user and device identity, access, compliance, and security, offering robust protection against potential data breaches.

In this context, we’ll use the Microsoft Graph API to extract data from a Teams channel.

## Identify Your Teams Channel

The extraction process is handled by a script that uses the Microsoft Graph API to fetch messages and their replies from a specific Teams channel.

The group id and channel id of the desired team and channel are required as parameters, which are specified as environment variables in a .env file.

Follow these steps to obtain the group id and channel id:

1. Open Microsoft Teams and navigate to the desired channel.
2. Click on the three-dot menu icon next to the channel name and select ‘Get link to channel’. This will copy the channel link to your clipboard.
3. Paste the copied link into a text editor. The link will be in the format `https://teams.microsoft.com/l/channel/&lt;channel_id&gt;/&lt;channel_name&gt;?groupId=&lt;group_id&gt;&amp;tenantId=&lt;tenant_id&gt;`.
4. Extract the `group_id` and `channel_id` from the link.

![Teams Channel Link](./Teams-Channel-Get-Link.jpg)

Once these values are obtained, they should be added to the .env file in the same directory as the script. The .env file should contain the following lines, replacing `&lt;group_id&gt;` and `&lt;channel_id&gt;` with the actual values:

```
GROUP_ID=<group_id>
CHANNEL_ID=<channel_id>
```

### Obtain a Graph API Access Token

To access Teams data via the Graph API, you’ll need to obtain a Graph API access token. Please note that you’ll only be able to extract data from Teams channels that you actively have access to.

You can get an access token by logging into the Microsoft Graph Explorer at https://developer.microsoft.com/graph/graph-explorer and copying the access token from the access token tab.

It’s important to note that these tokens have a short lifespan, measured in hours, so be prepared to regenerate them often by reloading the Graph Explorer UI.

![Graph Explorer](./Graph-Explorer-Get-Access-Token.jpg)

Once the access token is obtained, users need to replace the values in the .env file with their actual ACCESS_TOKEN, GROUP_ID, and CHANNEL_ID, and save the .env file in the same directory as the script.

## Query the Teams Channel Using the Graph API

It’s possible to query the Graph API using REST GET requests, but given the amount of information returned, it’s much more practical to do it using scripts.

I’ve written Python scripts for this purpose, which you can [get from my GitHub repo](https://github.com/mario-guerra/teams-channel-content-export).

The `channel_query.py` script fetches and formats messages and their replies from Microsoft Teams using the Microsoft Graph API. The script cleans the HTML content of the messages and formats them into a JSON structure.

To illustrate how the script fetches messages and their replies from a specific Teams channel using the Microsoft Graph API, consider the following code snippet:

```python
# Get the messages and their replies
url = f'https://graph.microsoft.com/beta/teams/{group_id}/channels/{channel_id}/messages?$expand=replies'
headers = {'Authorization': 'Bearer ' + access_token}
```

This code constructs the URL for the API request and sets the necessary headers, including the authorization token.

### Script Functionality

At the heart of the script’s functionality is a fetch of all messages and their replies from the specified channel and then a filter of the messages by date.

This two-step process is necessary because the Microsoft Graph API does not currently support the `createdDateTime` filter query parameter for the `/messages` endpoint. The date filter implemented in the script bypasses any messages that were created before the specified date.

The script formats the messages and their replies into a JSON structure, as shown in the following code snippet:

```python
formatted_message = {
    "messageId": message['id'],
    "messageDateTime": message['createdDateTime'],
    "messageContent": message_content,
    "replies": [
        {
            "replyId": reply['id'],
            "replyDateTime": reply['createdDateTime'],
            "replyContent": (re.sub('<[^<]+?>', '', html.unescape(reply['body']['content'])) if reply['body']['content'] else '').replace('\u00a0', ' ')
        }
        for reply in message['replies']
    ]
}
```

This code creates a dictionary for each message, capturing the message ID, timestamp, content, and replies.

The script also cleans the HTML content of the messages. This process is illustrated in the following code snippet:

```python
# Clean the HTML from the message content
message_content = html.unescape(message['body']['content']) if message['body']['content'] else ''
message_content = message_content.replace('\u00a0', ' ')

# Parse the message content as HTML
soup = BeautifulSoup(message_content, 'html.parser')

# For each <a> tag in the message content
for a_tag in soup.find_all('a'):
    # If the </a><a> tag has an href attribute
    if 'href' in a_tag.attrs:
        # Replace the </a><a> tag with its href attribute formatted as a Markdown link
        a_tag.replace_with(f"[{a_tag.text}]({a_tag['href']})")

# Convert the parsed HTML back to a string and remove all HTML tags
message_content = re.sub('<[^<]+?>', '', str(soup))
```

This code unescapes the HTML content, parses it, replaces any `<a>` tags with their href attributes formatted as Markdown links, and removes all remaining HTML tags.

### Running the Script

The script is run with two command-line arguments: the name of the output file and the date from which to fetch messages.

```
python .\channel_query.py output_file_name.json <YYYY-MM-DD>
```

The script prints the formatted messages as JSON to the console and, if an output file name is provided, writes the output to the file.

## Convert Channel Data to JSON

The second step in the process takes the JSON data file produced by the first script and extracts question-answer pairs using Azure OpenAI, creating a new JSON file for each pair.

```python
questions = await generate_qna(message_content, question_prompt)
answers = await generate_qna(questions + '\n' + answer_content, answers_prompt)
```

This code sends the message content and a predefined prompt to the OpenAI API to generate questions. Then, it sends the generated questions and the replies to the same API to generate answers.

### Script Functionality

The script’s core functionality is to extract question-answer pairs from the input JSON data, which was extracted from a Teams channel. It does this by sending requests to the OpenAI API to generate questions and answers based on the input data. The script then creates a new JSON file for each question-answer pair.

```python
pair = {
    "Questions": question_list,
    "Answers": answer_list
}

# Create a new file for each pair
with open(os.path.join(output_dir, f'qna_{counter}.json'), 'w') as f:
    f.write(json.dumps(pair, indent=4))
```

The script is designed to handle potential issues such as request timeouts and rate limits. If a request times out, the script

 retries the request up to three times before giving up.

## Conclusion

Leveraging Microsoft Teams data and the Microsoft Graph API, you can automate the process of extracting relevant information from Teams channels and building an AI-enhanced chatbot that can provide answers in real-time.

By extracting, processing, and integrating this data, we can build systems that make smarter, more efficient use of information and enable quicker responses to common queries, enhancing productivity in a distributed work environment.

You can find the full code for both scripts in my GitHub repo here: [GitHub Repo](https://github.com/mario-guerra/teams-channel-content-export).
