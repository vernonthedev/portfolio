# vernonthedev Portfolio

A modern, high-end developer portfolio website showcasing skills, projects, blog posts, and professional branding.

## Features

- 🎨 **Modern Design**: Sleek, minimal, futuristic aesthetic with dark mode first
- ⚡ **Performance**: Fast, optimized, and fully responsive
- 🎭 **Animations**: Smooth animations and micro-interactions using Framer Motion
- 📱 **Responsive**: Works beautifully on all devices
- ♿ **Accessible**: Built with accessibility in mind
- 🔍 **SEO Optimized**: Open Graph tags, structured data, sitemap, and robots.txt
- 🌓 **Theme Toggle**: Dark/light mode with smooth transitions
- 📊 **GitHub Integration**: Auto-fetches latest repositories
- 📝 **Blog Section**: Ready for markdown content
- 📧 **Contact Form**: Backend API for handling contact submissions

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod
- **Icons**: Lucide React
- **QR Code**: qrcode.react

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd vernonthedev-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
vernonthedev-portfolio/
├── app/
│   ├── api/              # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── sitemap.ts         # Sitemap generation
├── components/
│   ├── sections/          # Page sections
│   ├── Navigation.tsx     # Navigation component
│   └── ThemeProvider.tsx # Theme context
├── lib/
│   ├── github.ts          # GitHub API integration
│   └── utils.ts           # Utility functions
├── types/
│   └── index.ts           # TypeScript types
└── public/                # Static assets
```

## Configuration

### GitHub Integration

Update the GitHub username in `lib/github.ts`:
```typescript
const GITHUB_USERNAME = "vernonthedev";
```

### Contact Form

The contact form API route is at `app/api/contact/route.ts`. You can integrate with email services like:
- SendGrid
- Resend
- Nodemailer

### Website Details

Update website details in `app/api/website-details/route.ts`:
- Social media links
- Email address
- Bio and tagline

## Customization

### Colors

Edit `tailwind.config.ts` to customize the color palette:
- Primary colors: Blue gradient
- Accent colors: Purple gradient

### Content

- **Skills**: Edit `components/sections/Skills.tsx`
- **Blog Posts**: Edit `components/sections/Blog.tsx`
- **About**: Edit `components/sections/About.tsx`

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## Build

```bash
npm run build
npm start
```

## License

MIT

## Author

**vernonthedev**

- GitHub: [@vernonthedev](https://github.com/vernonthedev)
- YouTube: [@vernonthedev](https://youtube.com/@vernonthedev)
- Twitter: [@vernonthedev](https://twitter.com/vernonthedev)
