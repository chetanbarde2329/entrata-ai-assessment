# AI Code Explainer

A simple web app where you paste code → AI explains it in plain English.

### What I Built

- A clean React website (one single page)
- Left side: box to paste code + "Explain" button
- Right side: shows the code you pasted + AI explanation
- Below: button to show/hide your previous explanations (saved in browser)

### How It Works (Simple Flow)

1. You write or paste code
2. Click "Explain Code"
3. App sends code to AI (Mistral API)
4. AI sends back explanation → shown on right side
5. Old explanations saved in browser (localStorage) → can view later

### Main Technologies I Used

- **React** → makes the page interactive
- **Tailwind CSS** → makes it look nice and modern quickly
- **localStorage** → saves history without any server
- **Mistral AI** → the brain that explains the code

### Why I Chose These

- React + Tailwind = fast to build good-looking app
- No backend/server needed → very simple to run
- Mistral = fast + good at understanding code + not too expensive
- Everything on one page → easy and clean to use

### Features I Added

- Clear button also removes the explanation
- History is hidden by default (click "Show History" to see)
- Loading spinner while waiting for AI
- Works on phone and computer

Very simple project — but looks professional and useful!