# Healthcare Base

A comprehensive healthcare platform for **CBRILLIANCE AI-Techs LTD**, featuring Patient Module and Sub-Admin Module with modern, accessible, and data-driven design.

## 🏥 Features

### Patient Module
- **Welcome Screen**: Intuitive introduction to the platform
- **Authentication**: Secure login and signup with location-based registration
- **Dashboard**: Overview of appointments, health metrics, and quick actions
- **Doctor Booking System**: Browse specialists, view availability, and book appointments
- **Payment Simulation**: 95% clinic allocation, 5% admin fee
- **Payment Confirmation**: Detailed booking confirmation and payment receipts
- **Profile Management**: Update personal information and preferences
- **Health Records**: Manage vital signs, medical records, prescriptions, lab results, and documents
- **Notifications**: Real-time alerts with filtering and priority levels

### Sub-Admin Module
- **Secure Login**: Protected admin access
- **Dashboard**: KPIs, revenue analytics, and performance metrics
- **Booking Management**: View, filter, and manage all appointments
- **Remittance Section**: Detailed 95/5 revenue split tracking
- **Reports Page**: Generate and export comprehensive reports (PDF/Excel)

## 🎨 Design System

- **Primary Color**: #007BFF (Blue) - Trust and professionalism
- **Accent Color**: #00B894 (Green) - Health and vitality
- **Background**: White with neutral grays
- **Typography**: Clean, readable fonts optimized for accessibility
- **Theme**: Clinical, modern, and tech-smart aesthetics

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd healthcare-base
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:3000
```

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4
- **UI Components**: Custom component library with shadcn/ui patterns
- **Icons**: Lucide React
- **Animations**: Motion (Framer Motion)
- **Charts**: Recharts
- **Forms**: React Hook Form
- **Notifications**: Sonner

## 📁 Project Structure

```
healthcare-base/
├── components/
│   ├── admin/          # Admin module components
│   ├── patient/        # Patient module components
│   ├── shared/         # Shared layouts
│   ├── ui/             # Reusable UI components
│   └── LandingPage.tsx # Public landing page
├── styles/
│   └── globals.css     # Global styles and Tailwind config
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.html          # HTML template
```

## 🔐 Security Features

- Bank-level encryption for health data
- HIPAA compliance considerations
- Secure authentication flows
- Privacy-focused design
- Protected admin routes

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📱 Responsive Design

The platform is fully responsive and optimized for:
- Desktop (1920px and above)
- Laptop (1024px - 1919px)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 👥 Team

**CBRILLIANCE AI-Techs LTD**

## 📄 License

UNLICENSED - Proprietary software for CBRILLIANCE AI-Techs LTD

## 🤝 Contributing

This is a proprietary project. For internal development questions, please contact the development team.

---

**Built with ❤️ by CBRILLIANCE AI-Techs LTD**
