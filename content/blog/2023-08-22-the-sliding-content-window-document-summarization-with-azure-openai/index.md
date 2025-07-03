---
title: "'The Sliding Content Window: Document Summarization with Azure OpenAI'"
excerpt: "This post introduces a document summarization tool using Azure OpenAI"
date: "2023-08-22"
author: "Mario Guerra"
category: "Artificial Intelligence"
tags: [blog]
blogpost: true
coverImage: "/portfolio-website/images/blog/the-sliding-content-window-document-summarization-with-azure-openai/Summarizing-Documents-with-Azure-OpenAI.jpg"
---


Summarizing large documents with current-gen AI models can be challenging, since all are limited to various degrees in how many characters (tokens) they can process in one request.

An AI bot will happily summarize any content that fits in its context window, but how do we get a cohesive summary of large documents that are many times the size of the bot’s context window?

In this blog post, I’ll introduce a document summarizer I wrote that uses Azure OpenAI and a sliding content window algorithm to generate rich summaries of large documents. The script is written in Python and supports the summarization of plain text files, PDFs, Word documents, and even websites.

## Why use this tool?

I originally developed the document summarization tool to condense transcripts from recorded Microsoft Teams meetings. The tool has been invaluable for facilitating conversations with partner teams and utilizing the transcripts as meeting notes.

I’ve used these transcripts and summaries to generate blog content, design documents, and user stories for various products.

When I realized the tool’s potential, I adapted it to accommodate not only meeting transcripts but also PDFs, Word documents, and websites, in addition to plain text files.

As a product manager with a software development background, I’m convinced that tools like this will become increasingly common as AI large-language models (LLMs) gain wider adoption.

## Get the code

The full code for the document summarizer is available on my GitHub repo. Clone it locally using the following command:

```bash
git clone https://github.com/mario-guerra/AzureOpenAIDocSummarizer.git
```

Refer to the project [README](https://github.com/mario-guerra/AzureOpenAIDocSummarizer/blob/main/README.md) for installation and usage instructions. You’ll need access to an OpenAI GPT model, either from Azure or directly from OpenAI.

This project is currently set up to use Azure OpenAI models.

## Sliding Content Window

The sliding content window is a method that enables the document summarizer to iteratively summarize large documents without exceeding the AI model’s token limits, while maintaining sufficient context between summarization steps to create a cohesive summary.

I derived this method from my background in embedded design and signal processing, where it’s common to analyze a signal’s time-varying spectral properties by breaking it down into smaller overlapping segments and applying the Fourier Transform to each segment.

I realized that a similar strategy can be applied to large documents, since the meaning of what you’re currently reading only makes sense in the limited context of the few sentences that came before and the few sentences that come after.

When applied to document summarization, the sliding window approach processes the input document in text chunks sized according to a predefined summary level (verbose, concise, or terse). The sliding content window is made up of the most recent paragraphs from the previous summary, plus the current input text chunk.

The model is asked to summarize the new chunk and update the previous summary with the new information. This method ensures that the script can generate a cohesive summary of the entire document while keeping the context intact.

```python
# Process the input text in chunks and generate the summary
with open(output_path, "a") as out_f:
    processed_chars = 0
    while True:
        print("Summarizing...")
        # Read a chunk of text from the input_text
        chunk = input_text[processed_chars:processed_chars+chunk_size]
        processed_chars += len(chunk)

        # Break the loop if there's no more text to process
        if not chunk:
            break

        # Combine previous summary paragraphs and the current chunk
        input_text_chunk = "[PREVIOUS_SUMMARY]\n\n" + "\n\n".join(
            previous_summary_paragraphs) + "\n\n" + "[CURRENT_CHUNK]\n\n" + chunk

        # Process the text chunk and generate a summary
        summary_ctx = await process_text(input_text_chunk, summary_level)

        summary = str(summary_ctx)

        # Update the previous summary paragraphs based on the new summary.
        # If the summary has more than max_context_paragraphs, remove the first
        # paragraph until the summary is within the limit. As paragraphs are removed,
        # they are written to the output file.
        if summary:
            summary_paragraphs = extract_summary_paragraphs(summary)
            while len(summary_paragraphs) > max_context_paragraphs:
                out_f.write(summary_paragraphs.pop(0) + "\n\n")
                out_f.flush()
            previous_summary_paragraphs = summary_paragraphs
            print("\nSummary window: \n", summary)
        else:
            print("No summary generated for the current chunk.")

        # Calculate and display the progress of the summarization
        progress = (processed_chars / total_chars) * 100
        print(f"\nProgress: {processed_chars}/{total_chars} ({progress:.2f}%)")
```

## Communicating with Azure OpenAI

The document summarizer is using Microsoft’s [Semantic Kernel](https://learn.microsoft.com/semantic-kernel/overview/) project to communicate with Azure OpenAI services.

Semantic Kernel is an open-source SDK that facilitates the integration of AI services, such as OpenAI, Azure OpenAI, and Hugging Face, with programming languages like Python and C# with more on the way.

In the document summarizer script, the Semantic Kernel library’s `AzureChatCompletion` connector is used to communicate with Azure OpenAI, enabling me to communicate with a GPT-4 deployment for my document summarization.

## Supported File Types and Input Sources

The document summarizer is designed to handle various file types and input sources, including:

1. Text files
2. PDFs
3. Word documents
4. Websites

The script automatically detects the input file type and extracts the text accordingly using the following functions:

```python
def extract_text_from_pdf(pdf_path):
# ...
def extract_text_from_word(doc_path):
# ...
def extract_text_from_url(url):
# ...
```

These methods rely on functionality provided by various Python libraries, namely **PyPDF2**, **docx**, and **BeautifulSoup**.

## Customizable Summary Levels

The document summarizer offers three summary levels to cater to different needs:

1. Verbose: Detailed summary with a focus on key details and new information
2. Concise: Balanced summary highlighting key details and technical content (default)
3. Terse: Brief summary for executive action, focusing on key details and technical content

These summary levels can be easily adjusted using the optional `--summary-level` command-line argument.

Summary levels are managed through a combination of prompting, input chunk size, and token limits. The script defines three dictionaries that help manage the verbosity of the chat model output for the document summarizer. These dictionaries are:

```python
# Dictionary defining chunk sizes, which influence verbosity of the chat model output.
# The larger the chunk size, the more verbose the output. The chunk size is
# used to determine the number of characters to process in a given text during a
# single request to the chat model.
summary_levels = {
    "verbose": 5000,
    "concise": 10000,
    "terse": 20000,
}
# Dictionary defining request token sizes, which influence verbosity of the chat model output.
# The larger the request token size, the more verbose the output. The request token size is
# used to determine the number of tokens to request from the chat model during a single request.
request_token_sizes = {
    "verbose": 3000,
    "concise": 2000,
    "terse": 1000,
}
summary_prompts = {
    "verbose": """Summarize verbosely, emphasizing key details and incorporating new information from [CURRENT_CHUNK] into [PREVIOUS_SUMMARY]. Retain the first two paragraphs of [PREVIOUS_SUMMARY]. Remove labels, maintain paragraph breaks for readability, and avoid phrases like 'in conclusion' or 'in summary'.""",
    "concise": """Summarize concisely, highlighting key details, and update with new info. Ignore irrelevant content, include all technical content. Use [PREVIOUS_SUMMARY] and [CURRENT_CHUNK]. Keep first two paragraphs in [PREVIOUS_SUMMARY] as-is. Exclude these labels from summary. Ensure readability using paragraph breaks, and avoid phrases like 'in conclusion' or 'in summary'.""",
    "terse": """Summarize tersely for executive action using [PREVIOUS_SUMMARY] and [CURRENT_CHUNK], focusing on key details and technical content. Retain the first two paragraphs of [PREVIOUS_SUMMARY], remove labels, and maintain paragraph breaks for readability. Avoid phrases like 'in conclusion' or 'in summary'.""",
}
```

## Usage Instructions

To use the document summarizer, follow these steps:

1. Clone the repository to your local machine.
2. Install the required dependencies using pip.
3. Rename ‘.env.example’ to ‘.env’ and add your Azure OpenAI deployment name, API key, and endpoint.
4. Run the script with the following command:

```bash
python summarizer.py <input

_file> <output_file> --summary-level concise
```

Replace `<input_file>` with the path to your document and `<output_file>` with the desired location for the summary.

## Conclusion

This document summarizer tool provides a robust solution for managing large documents and is easily customizable to fit your needs. Whether you're summarizing meeting transcripts, PDFs, or web content, it can help you save time and increase productivity by leveraging the power of Azure OpenAI and the sliding content window technique.

For more information, check out the full project on [GitHub](https://github.com/mario-guerra/AzureOpenAIDocSummarizer).
