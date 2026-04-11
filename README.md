# Nihal Portfolio — Next.js

A modern, dark-themed personal portfolio for **Sharear Ahammed Nihal**, built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

## 🚀 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** React Icons
- **Notifications:** React Hot Toast
- **Fonts:** Syne (headings) + Inter (body)

## 📁 Project Structure

```
nihal-portfolio/
├── app/
│   ├── layout.tsx          # Root layout with Navbar, Footer, Toaster
│   ├── page.tsx            # Home page
│   ├── about/page.tsx      # About page
│   ├── skills/page.tsx     # Skills page
│   ├── projects/page.tsx   # Projects listing with filter
│   ├── project/[id]/       # Dynamic project detail page
│   ├── contact/page.tsx    # Contact form + social
│   └── globals.css         # Global styles & CSS variables
├── components/
│   └── sections/
│       ├── Navbar.tsx
│       ├── Footer.tsx
│       ├── HeroSection.tsx
│       ├── AboutPreview.tsx
│       ├── ProjectsPreview.tsx
│       ├── SkillsMarquee.tsx
│       └── CTASection.tsx
├── lib/
│   └── data.ts             # All portfolio data (personalInfo, projects, skills)
└── public/                 # Static assets (images, icons, CV)
```

## 🏁 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## ⚠️ Before Running

1. Add all images to the `/public` folder (see `/public/README.md` for the full list)
2. Place your CV as `CV of Sharear Ahammed Nihal.pdf` in `/public`
3. Update `lib/data.ts` to change personal info, projects, or skills

## 📄 Pages

| Route | Description |
|-------|-------------|
| `/` | Home — Hero, About preview, Projects preview, Skills marquee, CTA |
| `/about` | Full about page with bio, stats, values, tech stack |
| `/skills` | Detailed skills grid with icon cards and hover effects |
| `/projects` | Filterable projects grid (All / Professional / Full Stack / Frontend) |
| `/project/[id]` | Dynamic project detail page with gallery and links |
| `/contact` | Contact form with EmailJS + social links sidebar |

## 🎨 Design System

- **Brand color:** `#F97316` (orange)
- **Background:** `#0A0A0A`
- **Card bg:** `#111`
- **Heading font:** Syne
- **Body font:** Inter

## 📬 Contact Form

Update the `fetch` URL in `app/contact/page.tsx` with your backend or EmailJS endpoint.

## 🌐 Deployment

Deploy easily on [Vercel](https://vercel.com):

```bash
npx vercel
```
