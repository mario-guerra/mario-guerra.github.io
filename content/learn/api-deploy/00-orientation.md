---
title: "Orientation: Cloud Deployment & DevOps"
moduleNumber: 0
slug: "orientation"
description: "Configure billing alarms and set up your deployment environment safely."
soloCommand: null
pillar: null
checkpoint: false
---

# Orientation: Cloud Deployment & DevOps

Welcome! In this curriculum, you'll take your secured Task Organizer Web API and deploy it to public **production cloud servers**. 

> [!NOTE]
> **Sequential Prerequisite (Step 4 of 5)**
> This program is **Step 4** in your learning path. We recommend completing both the **API Design** and **Authentication & Security** courses first, as you will containerize and deploy the exact database API you developed in those courses. 

Instead of running only on your local machine (`http://127.0.0.1:8000`), your API will live on the public internet, accessible from any browser or mobile app in the world.

### Safety First: The $0.00 Budget Rule
Cloud computing can get expensive quickly if you configure resources incorrectly. As a software engineer, **your first task before creating any cloud resource is establishing a budget fence.** 

To prevent accidental credit card charges, we use **Render** and **Neon** as our primary deployment stack. Both are 100% free, run scale-to-zero compute limits, and **do not require credit card entry** to sign up.

If you choose the optional **GCP Cloud Run** track (which does require card verification on signup), you must set up a billing threshold limit of **$1.00** immediately during setup.

---

### Prerequisites
Before starting, ensure you have:
1. The completed, secured Task Organizer API repository from the previous course.
2. The automated `pytest` test suite passing locally.
3. A free [GitHub](https://github.com) account.

Let's begin!
