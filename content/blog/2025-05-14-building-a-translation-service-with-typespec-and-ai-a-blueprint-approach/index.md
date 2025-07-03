---
title: "Building a Translation Service with TypeSpec and AI: A Blueprint Approach"
excerpt: "Learn how I built an audio translation service by combining TypeSpec for API design with AI-assisted development. This practical approach demonstrates how TypeSpec provides a solid blueprint and foundation for your services, while AI accelerates implementation."
date: "2025-05-14"
author: "Mario Guerra"
category: "Artificial Intelligence"
tags: [blog]
blogpost: true
coverImage: "/portfolio-website/images/blog/building-a-translation-service-with-typespec-and-ai-a-blueprint-approach/TypeSpec-AI-Translation-Service.jpeg"
---


# Building a Translation Service with TypeSpec and AI: A Blueprint Approach

Have you ever wondered how to combine the structure of a well-designed API with the power of AI-assisted development? I recently built a translation and transcription service that does exactly that, using TypeSpec as the foundation and AI to accelerate the implementation.

In this post, I'll walk through how I built a service that translates and transcribes audio files using Azure Cognitive Services, with TypeSpec as the blueprint and AI as my development partner. This isn't about replicating my exact steps, but rather about showcasing an approach that can help you build better services faster.

You can watch the full demonstration of this project in the video below:

<iframe width="560" height="315" src="https://www.youtube.com/embed/mp5pnAzHw3k" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## The Origin Story

The idea for this service came from a personal need. My mother-in-law from Estonia had recorded a conversation with her parents on cassette tapes about their experiences during World War II. The recording was in Estonian, so I digitized the audio and used Azure Cognitive Services to translate it to English and transcribe it for the family.

At the time, I thought it would be awesome to have a service that does this automatically. Now, with TypeSpec's code generation capabilities and state-of-the-art AI models, I decided to build exactly that.

## The User Journey

Before diving into the technical details, let's walk through the user journey I designed for this service:

1. **Payment**: Users start by making a payment for a translation. They enter their contact information and select the service they want (either transcription or transcription plus audio synthesis).

2. **Upload**: After payment, users upload their audio file and specify the input and output languages.

3. **Processing**: In the cloud, the backend processes the translation and transcription using Azure Cognitive Services.

4. **Delivery**: Once complete, users receive an email with a download link to access their translated and transcribed content.

## The TypeSpec-AI Approach

Here's how I combined TypeSpec and AI to build the service:

### Step 1: Design the API with AI

I started with a conversation with ChatGPT, describing the user journey and asking for help creating an API spec. I described what I wanted the service to do, including operations, models, request and response bodies.

By the end of our conversation, I had a complete API spec in text form. I then used GitHub Copilot to convert this textual spec into TypeSpec code, specifically asking for the code to be modularized by routes, models, and errors.

### Step 2: Refine the TypeSpec Code

The AI-generated TypeSpec code wasn't perfect, but it was a solid starting point. I imported it into a TypeSpec project in VS Code and refined it with GitHub Copilot's help.

TypeSpec's role here is crucial - it serves as the blueprint and foundation for the entire service. Having a well-defined TypeSpec means I could iterate quickly on the API design before writing any implementation code.

### Step 3: Generate Code Scaffolding

With my TypeSpec code polished, I generated both client and server code scaffolding in C# and TypeScript. This is where TypeSpec's value really shines - it automatically creates all the boilerplate code needed to implement the API.

### Step 4: Implement the Business Logic with AI

I took the generated code and asked AI to help me implement the business logic. I created a Python script that copied all the source files into a markdown file, which I then shared with ChatGPT.

I explained what I wanted the service to do, and ChatGPT helped me write the backend code. However, it struggled with some specifics of Azure services.

### Step 5: Add Azure Services Integration

I had to step in when it came to integrating with Azure services. I found working examples of how to use Azure Blob Storage, Cognitive Services, and Communication Services for email, then adapted them for my project.

When the AI didn't have enough context to generate correct code for these services, I provided sample code which it could then use as a reference.

### Step 6: Deploy to Azure

Once the backend was working locally, I deployed it to Azure as a web app. I also built a CLI client using a similar AI-assisted approach.

## Building a House: The TypeSpec Analogy

If you're wondering whether TypeSpec is really necessary given how much AI is involved in this process, I'd say it's absolutely crucial. Here's my favorite analogy:

Think about building a house. You could ask a builder to construct a house for you with no further instruction, and they might create something functional - but it would likely be nothing like what you had in mind.

However, if you provide the builder with detailed blueprints, they can create exactly what you envisioned. In this analogy:

- **TypeSpec is the blueprint** - it defines exactly what your API should look like
- **Generated code is the foundation** - it gives you a solid starting point 
- **AI is the builder** - it helps construct the rest based on your blueprint

With TypeSpec as the blueprint, the AI has a clear structure to follow, resulting in more accurate and useful code generation.

## The Benefits of the Blueprint Approach

Using TypeSpec as the grounding "source of truth" for an AI-assisted development project offers several advantages:

1. **Structure and Clarity**: TypeSpec provides a clear, readable structure for your API that both humans and AI can understand.

2. **Iterative Development**: You can iterate on your TypeSpec design and regenerate code as needed, without losing your implementation.

3. **Consistency**: The generated code maintains consistency across the entire API, following best practices.

4. **Documentation**: TypeSpec can include rich documentation that guides both AI and human developers.

In fact, I found that adding doc comments to the TypeSpec made the AI-generated implementation even better. When I asked ChatGPT to add detailed documentation to my TypeSpec, the resulting code was not only better documented but also more scenario-focused.

## The Future of AI-Assisted Development

This project demonstrated to me that the combination of TypeSpec and AI represents a powerful approach to building services. AI can help bootstrap development, but having TypeSpec as the structured foundation ensures that what gets built actually meets your requirements.

As models continue to improve, particularly with more exposure to TypeSpec, this approach will only become more powerful. However, the fundamental value proposition remains the same: TypeSpec provides the blueprint, and AI helps you build on that foundation more quickly and effectively.

## Conclusion

Building a translation and transcription service using TypeSpec and AI allowed me to create something in days that might have otherwise taken weeks. TypeSpec provided the critical structure and foundation, while AI accelerated the implementation.

I genuinely believe that by leveraging these tools together, I was able to significantly speed up development. In fact, I'm not sure I could have built this service without them, at least not in the timeframe I had available.

The combination of TypeSpec as the blueprint and AI as the builder creates a powerful synergy that I expect to use in many projects going forward. The clear, readable nature of TypeSpec makes it an ideal companion for AI-assisted development, ensuring that what gets built is what you actually want.
