# X Talents

A modern charity website for X Talents, a Singapore-based organization empowering unemployed, part-time, and freelance job seekers.

## Environment Setup

This project uses environment variables to securely handle API keys.

1. Copy `.env.example` to a new file named `.env.local`:
```
cp .env.example .env.local
```

2. Replace the placeholder values in `.env.local` with your actual API keys.

3. **IMPORTANT**: Never commit `.env.local` or any file containing real API keys to the repository.

## Available Features

- Homepage
- About Page
- X Talents Pool
- Submit Resume
- CV Tailor (requires Gemini API key)
- Support Us

## Getting Started

```bash
# Install dependencies
npm install

# Start the development server
npm run dev

# Build for production
npm run build
```

## Tech Stack

- React
- TypeScript
- Vite
