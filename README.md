# AI/ML Portfolio Website

A modern, responsive portfolio website built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion. Designed to showcase AI/ML projects, work experience, leadership positions, and skills.

## Features

- 🎨 Modern, clean design with smooth animations
- 🌓 Dark mode support with theme persistence
- 📱 Fully responsive (mobile, tablet, desktop)
- ♿ WCAG 2.1 AA accessibility compliant
- 🚀 Optimized performance (Lighthouse score ≥90)
- 🔍 SEO optimized with meta tags and structured data
- ⚡ Built with Next.js 14 App Router for fast page loads

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v3
- **Animations**: Framer Motion
- **Icons**: React Icons
- **Forms**: React Hook Form + Zod validation
- **Deployment**: Vercel (recommended) or Netlify

## Project Structure

```
portfolio-website/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Main landing page
│   ├── about/             # About page
│   ├── projects/          # Projects page
│   ├── experience/        # Experience page
│   └── contact/           # Contact page
├── components/            # React components
│   ├── layout/           # Header, Footer, ThemeToggle
│   ├── sections/         # Page sections
│   ├── cards/            # Card components
│   ├── ui/               # Reusable UI components
│   └── animations/       # Animation components
├── lib/                  # Utilities and data
│   ├── data/            # Content data files
│   ├── utils/           # Utility functions
│   └── hooks/           # Custom React hooks
├── public/              # Static assets
├── types/               # TypeScript type definitions
└── styles/              # Global styles
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run tests

## Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Add your environment variables here
# Example:
# NEXT_PUBLIC_SITE_URL=https://yoursite.com
```

### Customization

1. **Content**: Edit data files in `lib/data/` to add your projects, experience, and skills
2. **Theme**: Modify colors in `tailwind.config.ts`
3. **Metadata**: Update SEO metadata in `app/layout.tsx`

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Deploy with one click

### Netlify

1. Push your code to GitHub
2. Import your repository on [Netlify](https://netlify.com)
3. Set build command: `npm run build`
4. Set publish directory: `.next`

## License

MIT License - feel free to use this template for your own portfolio!
