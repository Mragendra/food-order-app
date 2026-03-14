# 🍔 GRUB — Food Ordering App

A React food ordering app with a dark editorial aesthetic.

## Features

- **Menu page** — 16 dishes across 6 categories with search & filter
- **Cart** — slide-in panel with qty controls, subtotal, delivery & total
- **Add Dish** — form with live preview to add new menu items
- **Kids Menu** — Spiderman-themed page with 8 kids dishes, animated SVG spider, web decorations

## Tech

- React 18 (hooks, useMemo, useState)
- CSS Modules (scoped styles per component)
- No external UI libraries — all custom
- Google Fonts: Bebas Neue, DM Sans, Playfair Display, Bangers, Nunito

## Getting Started

```bash
npm install
npm start
```

## Project Structure

```
src/
├── App.js               # Root component & all shared state
├── data.js              # Adult menu items
├── kidsData.js          # Kids menu items
├── components/
│   ├── Header
│   ├── CategoryBar
│   ├── MenuCard
│   └── Cart
└── pages/
    ├── AddDish
    └── KidsMenu
```
