# ATELIER NOIR — Contemporary Luxury Fashion

ATELIER NOIR is a concept digital flagship and editorial e-commerce experience for an original contemporary fashion house built around timeless design, architectural tailoring, tactile materials, and modern individuality.

> **Concept Demonstration Notice:** ATELIER NOIR is a fictional fashion label created as a design and frontend engineering showcase. All collections, campaigns, prices, and checkout flows are non-commercial demonstrations; no real orders are placed and no payment information is collected.

---

## Brand Concept

- **Positioning:** Contemporary luxury. Refined essentials. Modern individuality.
- **Visual Direction:** Warm ivory (`#F7F5F0`), stone (`#EFECE6`), deep charcoal (`#1A1A1A`), and rich black (`#0E0E0E`), accented by collection-specific tones including espresso, olive, sand, burgundy, and muted navy.
- **Typography:** High-contrast editorial serif (`Cormorant Garamond`) paired with clean geometric sans-serif (`Plus Jakarta Sans`) and tabular figures (`IBM Plex Mono`).

## Core Features

- **Editorial Campaign Homepage:** Full-bleed campaign photography with subtle crossfades, curated collection index, asymmetric new arrivals, and atelier philosophy.
- **Complete Product Universe:** Womenswear, Menswear, Footwear, Accessories, and Lifestyle Goods organized across five distinct collections (*The Essentials*, *The Form Collection*, *The Off-Duty Collection*, *The Objects Collection*, and *The Seasonal Edit*).
- **Interactive Shop & Discovery:** Live search, category and collection filtering, color and size filters, multi-criteria sorting, hover secondary angle previews, and recently viewed history.
- **Product Detail Views:** Multi-angle gallery with lightbox zoom, color swatches, size selector with measurement guide, material composition, care instructions, wishlist toggle, and related pieces.
- **Editorial Lookbook:** Magazine-style curated looks with interactive garment markers linking directly to individual pieces.
- **Campaigns & Journal:** Five original editorial campaigns and a multi-category fashion journal (*Fashion*, *Design*, *Materials*, *Craftsmanship*, *Culture*, *Lifestyle*).
- **Shopping Bag & Checkout Demo:** Persistent local storage for bag, wishlist, and recently viewed items, plus a transparent concept checkout review drawer.

## Technology Stack

- **Framework:** React 19 + TypeScript
- **Build Tool:** Vite 8
- **Styling:** Tailwind CSS v4
- **Motion:** GSAP (ScrollTrigger) + Motion (Framer Motion)
- **Icons:** Lucide React

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The development server runs at `http://localhost:3000`.

### Typecheck & Production Build

```bash
npm run lint
npm run build
```

## Project Structure

```text
├── index.html
├── metadata.json
├── package.json
├── README.md
├── LICENSE
├── .gitignore
└── src/
    ├── assets/images/        # Generated editorial & product photography
    ├── context/              # Persistent shopping bag, wishlist, and navigation state
    ├── data/                 # Products, collections, lookbook, campaigns, journal
    ├── components/           # Navigation, drawers, product cards, editorial modules
    ├── pages/                # Home, Shop, Product Detail, Collections, Lookbook, Campaigns, Journal, About
    ├── App.tsx
    ├── main.tsx
    └── index.css
```

## Asset Credits & Attribution

- **Source Code & Design:** Original implementation licensed under the terms in `LICENSE`.
- **Photography:** Original concept fashion and still-life images generated specifically for ATELIER NOIR; these images depict fictional garments and models and are not photographs of real commercial products or real customers.
- **Typography:** `Cormorant Garamond`, `Plus Jakarta Sans`, and `IBM Plex Mono` served via Google Fonts under their respective open font licenses.
