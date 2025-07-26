# Personal Blog & Portfolio

A personal website built with Astro, featuring a blog, project showcase, and bookmarks collection. This site demonstrates clean architecture, elegant design, and optimal developer experience.

## ✨ Features

- **📝 Blog System** - Technical articles with Markdoc support and syntax highlighting
- **🚀 Project Showcase** - Portfolio of development projects with detailed case studies
- **🔖 Bookmarks** - Curated collection of interesting articles and resources
- **🎨 Modern Design** - Editorial-style layouts with smooth animations
- **🌙 Dark Theme** - Carefully crafted dark mode with excellent readability
- **📱 Responsive** - Mobile-first design that works on all devices
- **🔍 SEO Optimized** - Proper meta tags, Open Graph, and structured data

## 🛠️ Tech Stack

- **Framework**: [Astro](https://astro.build) - Static site generator with island architecture
- **Styling**: [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework
- **Content**: [Markdoc](https://markdoc.dev) - Powerful markdown authoring framework
- **Syntax Highlighting**: [Shiki](https://shiki.matsu.io) - Beautiful code highlighting
- **Icons**: [Iconify](https://iconify.design) - Comprehensive icon collection
- **Deployment**: Static hosting optimized build
- **Package Manager**: [pnpm](https://pnpm.io) - Fast, disk space efficient

## 📁 Project Structure

```
/
├── public/                  # Static assets
│   ├── fonts/              # Custom font files
│   ├── images/             # Site images and icons
│   └── meta/               # SEO and social media images
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── features/       # Feature-specific components
│   │   │   ├── blog/       # Blog-related components
│   │   │   ├── bookmark/   # Bookmark components
│   │   │   └── project/    # Project showcase components
│   │   ├── layout/         # Layout components
│   │   │   ├── navigation/ # Navigation system
│   │   │   ├── Header.astro
│   │   │   └── Footer.astro
│   │   └── ui/             # Generic UI components
│   ├── content/            # Content collections
│   │   ├── blog/           # Blog posts (.mdoc files)
│   │   ├── bookmark/       # Bookmarked articles
│   │   ├── project/        # Project case studies
│   │   └── config.ts       # Content collection schemas
│   ├── layouts/            # Page layouts
│   ├── pages/              # File-based routing
│   │   ├── blog/           # Blog pages and dynamic routes
│   │   ├── bookmarks/      # Bookmark pages
│   │   └── projects/       # Project pages
│   ├── styles/             # Global styles
│   └── utils/              # Utility functions
├── markdoc.config.mjs      # Markdoc configuration
├── tailwind.config.mjs     # Tailwind CSS configuration
└── astro.config.mjs        # Astro configuration
```

**Built with ❤️ using Astro and modern web technologies**
