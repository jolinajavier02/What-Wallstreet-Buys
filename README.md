# What-Wallstreet-Buys

What-Wallstreet-Buys is a React + TypeScript finance website for publishing stock-market analysis and social-ready content.

The app has two main experiences:

- Public website at `/`: finance landing page, market pulse, stock analysis cards, sector flow, trending tickers, and research feed.
- Owner studio at `/owner`: creator dashboard for designing post graphics, writing captions, selecting website/social destinations, and preparing posts.

## Tech Stack

- React
- TypeScript
- Vite
- CSS
- JSON data source in `src/data/siteData.json`

## Getting Started

Install dependencies:

```bash
npm install
```

Run the local development server:

```bash
npm run dev
```

Open:

- Public site: `http://127.0.0.1:5173/`
- Owner studio: `http://127.0.0.1:5173/owner`

If Vite chooses another port, use the URL printed in the terminal.

## Build

```bash
npm run build
```

This runs TypeScript checking and creates a production build in `dist/`.

## Project Structure

```text
src/
  App.tsx                  Route switch between public site and owner studio
  main.tsx                 React entry point
  data/siteData.json       Market, post, social, and stock analysis data
  pages/UserView.tsx       Public finance website
  pages/OwnerDashboard.tsx Owner creator studio
  styles.css               Global styling for both experiences
```

## Owner Studio Features

- Post canvas with multiple ratios: square, story, X/wide, and LinkedIn.
- Editable stock post content: title, subtitle, ticker, percentage, and caption.
- Background colors and effects.
- Font style and size controls.
- Upload image/video media to the canvas.
- Add finance icons or custom text badges.
- Move, resize, recolor, select, and remove icons/text badges.
- Undo and redo editor changes.
- Select publish destinations for website and connected social platforms.
- Schedule, export, save draft, and publish action states.

## Public Website Features

- Finance-focused landing page.
- Market pulse cards.
- Stock analysis display with scores and institutional flow.
- Sector flow module.
- Trending tickers.
- Market intelligence feed.
- Login and signup calls to action.

## Notes

The current publishing/social media actions are front-end UI flows. Backend authentication, account linking, real media export, and live social posting APIs can be connected later.
