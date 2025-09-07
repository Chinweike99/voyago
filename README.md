# Luxury Travel & Tourism Platform

A comprehensive, modern travel booking platform built with Next.js 15, featuring stunning animations, glass morphism design, and a complete booking system for destinations, hotels, flights, and tours.

## ✨ Features

### Core Functionality
- **Advanced Search & Filtering** - Multi-criteria search with date pickers, guest selection, and comprehensive filters
- **Complete Booking System** - Step-by-step booking flow with form validation and confirmation
- **User Account Management** - Profile settings, booking history, and personalized dashboard
- **Wishlist System** - Save and manage favorite destinations, hotels, and tours
- **Review System** - Write and manage reviews with photo uploads
- **Responsive Design** - Optimized for all devices with mobile-first approach

### Pages & Sections
- **Homepage** - Hero section with search, featured destinations, and testimonials
- **Explore** - Discover destinations with advanced filtering
- **Hotels** - Browse and book accommodations
- **Flights** - Flight search and booking (UI ready)
- **Tours** - Guided tour packages and experiences
- **Blog** - Travel articles and tips
- **User Account** - Dashboard, profile, bookings, and wishlist
- **Content Pages** - About, FAQ, Contact with forms

### Design & UX
- **Glass Morphism Effects** - Modern frosted glass aesthetic
- **Smooth Animations** - Framer Motion powered interactions
- **Gradient Backgrounds** - Carefully crafted color schemes
- **Performance Optimized** - Lazy loading, image optimization, and skeleton loaders
- **Accessibility** - WCAG compliant with proper ARIA labels

## 🛠 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + shadcn/ui components
- **Animations**: Framer Motion
- **State Management**: Zustand
- **Form Handling**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **Image Optimization**: Next.js Image component with lazy loading

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone or download the project**
   \`\`\`bash
   # If using GitHub integration
   git clone <your-repo-url>
   cd travel-platform
   
   # Or download ZIP from v0 and extract
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. **Run the development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

\`\`\`bash
npm run build
npm start
\`\`\`


## 🎨 Design System

### Colors
- **Primary**: Coral gradient (#FF6B6B to #FF8E53)
- **Secondary**: Ocean gradient (#4ECDC4 to #44A08D)
- **Accent**: Sunset gradient (#FFD93D to #FF6B6B)
- **Neutrals**: Sophisticated grays and whites


### Components
- **Glass Cards**: Backdrop blur with subtle borders
- **Buttons**: Gradient backgrounds with hover effects
- **Forms**: Floating labels with validation states
- **Navigation**: Smooth transitions and active states

## 🔧 Development Notes

### State Management
The app uses Zustand for state management with the following stores:
- **Search State**: Current search parameters and filters
- **Wishlist**: User's saved items with full object data
- **User State**: Authentication and profile information
- **Booking State**: Current booking flow data

### API Structure
Mock API functions simulate real backend calls:
- **Destinations**: `getDestinations()`, `getDestinationById()`
- **Hotels**: `getHotels()`, `getHotelById()`, `getRelatedHotels()`
- **Tours**: `getTours()`, `getTourById()`, `getRelatedTours()`
- **Flights**: `searchFlights()` (ready for integration)

### Performance Optimizations
- **Image Optimization**: Next.js Image with lazy loading
- **Code Splitting**: Automatic route-based splitting
- **Bundle Analysis**: Optimized imports and tree shaking
- **Loading States**: Skeleton loaders for better UX
- **Error Boundaries**: Graceful error handling

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub repository
2. Connect repository to Vercel
3. Deploy automatically with zero configuration

### Other Platforms
The app is a standard Next.js application and can be deployed to:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

