# Tech Solutions Hub - Kumbakonam

A modern, responsive single-page React website for Tech Solutions Hub, a business providing digital services in Kumbakonam, Tamil Nadu.

## Features

### 🎯 Business Services
- **Internship Programs** - Hands-on experience with real-world projects
- **College Projects** - Complete project development from concept to deployment
- **Website Development** - Modern, responsive websites for businesses and individuals
- **Logo Design** - Creative and professional logo designs

### 🏛️ Tourism Information
- **Famous Temples** - Information about Adi Kumbeswarar, Airavatesvara Temple, and more
- **Local Specialties** - Degree Coffee and traditional delicacies
- **Handicrafts** - Brass vessels and traditional crafts
- **Tourist Guide Services** - Expert local guides for temple city experience

### 🎨 Design Features
- **Modern UI/UX** - Clean, professional design with glassmorphism effects
- **Smooth Animations** - Framer Motion powered animations throughout
- **Responsive Design** - Optimized for mobile, tablet, and desktop
- **Gradient Backgrounds** - Beautiful gradient overlays and text effects
- **Interactive Elements** - Hover effects and smooth transitions

## Tech Stack

- **React 18** with TypeScript
- **Vite** - Fast build tool and development server
- **TailwindCSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Beautiful icon library

## Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd tech-solutions-hub
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
├── App.tsx          # Main application component
├── main.tsx         # Application entry point
├── index.css        # Global styles and TailwindCSS imports
└── assets/          # Static assets
```

## Customization

### Colors
The website uses a custom color palette defined in `tailwind.config.js`:
- Primary colors (blue/purple gradients)
- Temple colors (orange/red/yellow gradients)
- Custom glassmorphism effects

### Content
All content is hardcoded in the `App.tsx` component. To modify:
1. Update the service descriptions in the Services section
2. Modify tourism information in the Tourism section
3. Update contact information in the Contact section

### Styling
- Global styles are in `src/index.css`
- Component-specific styles use TailwindCSS classes
- Custom CSS classes are defined in the `@layer components` section

## Features Implemented

✅ **Hero Section**
- Full-screen gradient background with glassmorphism
- Animated headline and sub-headline
- Two CTA buttons with hover effects
- Smooth entrance animations

✅ **About Section**
- Developer credentials and certifications
- Service highlights with checkmarks
- Glassmorphism card design

✅ **Services Section**
- Four animated service cards
- Hover animations with scale and lift effects
- Gradient icon backgrounds
- Responsive grid layout

✅ **Tourism Section**
- Cultural theme with warm colors
- Four tourism info cards with emojis
- "Learn More" buttons with animations
- Temple city branding

✅ **Contact Section**
- Contact information with clickable links
- Contact form (UI only, no backend)
- Google Maps embed for Kumbakonam
- Glassmorphism design elements

✅ **Footer**
- Business branding
- Social media links
- Copyright information
- Gradient text effects

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

© 2025 Tech Solutions Hub. All Rights Reserved.

## Contact

- **Email**: info@techsolutionshub.com
- **Phone**: +91 98765 43210
- **Location**: Kumbakonam, Tamil Nadu, India