[![Award](https://img.shields.io/badge/Award-2nd%20Place%20at%20EduCathon-orange)](https://educathon.devpost.com/project-gallery)
[![License](https://img.shields.io/badge/license-MIT-blue)](https://github.com/nragland37/Conscious-Chrome-Extension/blob/main/LICENSE)

<br />
<div align="center">
  <img src="https://github.com/nragland37/Conscious-Chrome-Extension/blob/main/public/img/conscious_logo.png" alt="Logo" width="30%">
  <br />
    <p align="center"> Exposing Truth. Empowering You. </p>
</div>

<br />

<div align="center">
  <img src="https://github.com/nragland37/Conscious-Chrome-Extension/blob/main/public/img/conscious-demo2.gif">
  <br />
    <a href="https://youtu.be/I2-JWIZB_KU"> View Demo </a>
</div>

# Inspiration

This project is inspired by the teachings of **Dr. James Curtis**, Department Chair of Computer and Information Sciences at Webster University. He introduced the concept of the **"Triad of Disruption,"** which explores how digital social engineering, social media, and propaganda work together to influence public opinion and disrupt democracies. We developed this tool to help users recognize and understand these manipulative techniques, fostering a more informed and vigilant online community.

<div align="center">
  <a href="https://ibb.co/G9zq6Qx">
    <img src="https://github.com/nragland37/Conscious-Chrome-Extension/blob/main/public/img/triad3.png" alt="triad3"/>
  </a>
  <p align="center">
    The Triad of Disruption
  </p>
</div>

> "The triad takes the Digital Social Triangle and expands upon two of its elements, digital social engineering and social media, adding in propaganda/fake news to become a powerful information weapon." - Dr. James Curtis


## Description

Conscious is a tool designed to analyze tweets and provide insights into content reliability, bias, and potential propaganda. It helps users navigate social media with a clearer understanding of the narratives they encounter. Whether it's news, opinions, or discussions, Conscious delivers a more informed, balanced perspective, promoting a healthier digital environment.

By offering diverse viewpoints, Conscious empowers users to critically engage with content and reduce the impact of misinformation. From trending topics to everyday browsing, it equips users to make informed decisions about the information they consume.

### Perspective
Generates an opposing viewpoint using APIs, giving users a broader context for the information presented.

<div align="center ">
  <a href="https://github.com/nragland37/Conscious-Chrome-Extension/tree/main">
    <img src="https://github.com/nragland37/Conscious-Chrome-Extension/blob/main/public/img/conscious-perspective2.png" alt="perspective" width="80%">
  </a>
</div>

### Propaganda Rating
Uses advanced APIs to detect and rate the level of propaganda in a tweet, helping users gauge the trustworthiness of the content.

<div align="center ">
  <a href="https://github.com/nragland37/Conscious-Chrome-Extension/tree/main">
    <img src="https://github.com/nragland37/Conscious-Chrome-Extension/blob/main/public/img/conscious-propaganga2.png" alt="propaganda" width="80%">
  </a>
</div>

### Reliability
Scores content reliability on a scale from 1 to 10, where 1 indicates low reliability and 10 indicates high reliability. This helps users assess the credibility of the information.

<div align="center ">
  <a href="https://github.com/nragland37/Conscious-Chrome-Extension/tree/main">
    <img src="https://github.com/nragland37/Conscious-Chrome-Extension/blob/main/public/img/conscious-reliability2.png" alt="reliability" width="80%">
  </a>
</div>

## How it works
<div align="center">
  <a href="https://github.com/nragland37/Conscious-Chrome-Extension/tree/main">
    <img src="https://github.com/nragland37/Conscious-Chrome-Extension/blob/main/public/img/diagram.png" alt="process flow" width="75%">
  </a>
</div>

The extension extracts the tweet text and sends it to GPT-3 Turbo AI, which creates a search prompt. This prompt is used to query TheNewsAPI for relevant articles. GPT-4 then analyzes these articles alongside the original tweet to provide a reliability score, different perspectives, and a propaganda rating. The results are displayed directly in the extension for easy access and interaction.

## Tech Stack & APIs

**Frontend:** React, Tailwind CSS, TypeScript  
**Build Tool:** Webpack  
**Integrated APIs:** GPT-3 & GPT-3.5-Turbo, TheNewsAPI

## Getting Started
To run this project locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/nragland37/Conscious-Chrome-Extension.git
   ```

2. **Navigate into the project directory:**
   ```bash
   cd Conscious-Chrome-Extension
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Build the project:**
   ```bash
   npm run build
   ```

5. **Set up your OpenAI API key:**
   - Apply for an OpenAI API key [here](https://beta.openai.com/signup/).
   - Create a `.env` file in the root directory and add your API key:
     ```plaintext
     OPEN_KEY=[your-openai-api-key]
     ```

6. **Chrome (Only):**
   - Open Chrome and navigate to the extensions page by visiting `chrome://extensions`.
   - Enable "Developer mode".
   - Click "Load unpacked extension" and browse to the `Conscious-Chrome-Extension/dist` directory to select it.

## Future Plans
- **Cross-Browser Compatibility:** Extend support to ensure seamless functionality across all major web browsers.
- **Wider Social Media Integration:** Implement the extension across additional social media platforms to broaden its impact.
- **Deepfake Detection:** Expand capabilities to include the identification and analysis of deepfake videos.
