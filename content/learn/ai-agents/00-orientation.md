---
title: "Orientation: AI Agent Development"
moduleNumber: 0
slug: "orientation"
description: "Welcome to AI Agent Development. Set up your environment and obtain a free Gemini API key."
checkpoint: false
---

# Orientation: AI Agent Development

Welcome! You are starting a program dedicated to **AI Agent Development** (Agentic Engineering). 

> [!NOTE]
> **Sequential Prerequisite (Step 5 of 5)**
> This program is **Step 5** in your learning path. For the best experience, we suggest completing the prior courses first, as this project integrates the Python CLI from **SOLO Fundamentals** with the database schemas and security wrappers developed across the previous steps.

In traditional programming, you write exact instructions for every step a computer must take. In **agentic engineering**, you build autonomous software systems that are given a high-level goal, evaluate choices, execute functions (tools), and self-correct when errors arise.

### Cost Safety: 100% Free Google AI Studio
Developing LLM applications can get expensive if you use paid developer credits. To make this curriculum completely accessible, we use the **Gemini API Free Tier** via Google AI Studio:
- **Cost:** **$0.00** (completely free, no credit card required to sign up).
- **Rate Limits:** 15 Requests Per Minute (RPM), which is plenty for local developer testing and debugging.

#### Setup Your API Key:
1. Go to [Google AI Studio](https://aistudio.google.com/) and sign in with a Google account.
2. Click **Get API Key** and create a key.
3. Add the key to your local environment shell session or your project's `.env` file:
   - **Mac/Linux:** `export GEMINI_API_KEY="your_api_key_here"`
   - **Windows (CMD):** `set GEMINI_API_KEY="your_api_key_here"`
   - **Windows (PowerShell):** `$env:GEMINI_API_KEY="your_api_key_here"`

#### Install dependencies:
Create a new folder `agent-playground` and set up your virtual environment, then install the official Google GenAI SDK:
```bash
pip install google-genai pydantic python-dotenv pytest
```

Let's get started!
