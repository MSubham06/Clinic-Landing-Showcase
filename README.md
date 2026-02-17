# 🏥 Lumina Health Clinic Web App (Private Commercial Project)

> ⚠️ **Private & Commercial Project**
>
> This project is privately developed and publicly deployed strictly for portfolio demonstration purposes.
> Source code is NOT open-source.
> Unauthorized copying, redistribution, or public sharing of this codebase is strictly prohibited.

![Project Status](https://img.shields.io/badge/Status-Production--Ready-brightgreen)
![Access](https://img.shields.io/badge/Access-Private-red)
![License](https://img.shields.io/badge/License-Commercial-blue)

---

# 📌 Table of Contents

- Overview
- Confidentiality & Commercial Notice
- What’s New (Major Updates)
- Key Features
- Tech Stack
- Project Structure
- Admin Portal
- Installation
- Usage
- Configuration
- Dummy Data Pack
- Project Status
- Deployment Status
- Commercial Licensing
- Troubleshooting
- Contact
- License & Restrictions

---

# 🧾 Overview

**Lumina Health Clinic Web App** is a fully interactive, modern clinic management frontend application.

It combines:

- Patient appointment booking
- Dynamic doctor profile routing
- Secure receptionist login system
- Protected admin dashboard
- Advanced offline detection system
- Premium app-like UI refinements

Originally started as a landing page, this project evolved into a **complete clinic web application system**.

---

# 🔒 Confidentiality & Commercial Notice

This project is:

- ❌ NOT open-source  
- ❌ NOT available for free distribution  
- ❌ NOT permitted for public code sharing  
- ❌ NOT allowed to be uploaded to public repositories  

However:

- ✅ The project **is publicly deployed** for showcasing to clients.
- ✅ The project **can be licensed or sold to developers**.
- ✅ Commercial usage is allowed **only with direct authorization from the developer**.

This is a paid, commercial-grade frontend system.

---

# 🆕 What’s New (Major Updates)

## 🔐 Receptionist Dashboard
- Secure `/admin` route
- State-based authentication
- Receptionists can manage appointments
- Protected against unauthorized access

## 🔑 Login System
- Dedicated login portal
- Prevents unauthorized dashboard entry
- Hardcoded credentials (development mode)
- Ready for backend authentication integration

## 👨‍⚕️ Dynamic Doctor Bio Pages
- Dedicated `DoctorBio` route
- Built using dynamic routing
- Scalable for multi-doctor setup

## 🌐 Advanced Offline System
- Detects internet disconnection automatically
- Displays custom “Sleeping Doctor” 3D offline page
- Image preloading for seamless experience
- Smooth reconnection handling

## 🎨 Global Layout Refinements
- `select-none` applied globally
- `cursor-default` for software-like UX
- App-style interaction instead of static website feel

---

# ✨ Key Features

## 🏠 Patient Experience
- Modern Hero Section with CTA
- Doctor Portfolio
- Services Showcase
- Smart Appointment Booking Form
- Testimonials
- Google Maps Integration
- Contact & Working Hours
- Fully Responsive Design
- Accessible UI

## 🔐 Admin Portal
- Secure login authentication
- Protected `/admin` route
- Appointment management interface
- State-based route protection using React Hooks

## 🌐 Offline Resilience
- Real-time network detection
- Custom offline fallback screen
- Optimized 3D illustration handling
- Stable UI during connectivity loss

## 📄 Dynamic Routing
- Built using `react-router-dom (v6+)`
- Dedicated doctor bio pages
- Clean scalable route structure

---

# 🛠️ Tech Stack

## Frontend
- React.js (Vite)
- react-router-dom (v6+)

## State Management
- React Hooks
  - useState
  - useEffect

## Styling
- Tailwind CSS
- Custom medical color palette
- Global layout UX refinements

## Icons
- lucide-react

## Maps
- Google Maps Embed API

## Assets
- Optimized 3D renders for offline handling

---

# 📂 Project Structure

```
src/
│
├── components/
│   ├── Navbar.jsx
│   ├── Hero.jsx
│   ├── Services.jsx
│   ├── DoctorProfile.jsx
│   ├── DoctorBio.jsx
│   ├── BookingForm.jsx
│   ├── Login.jsx
│   ├── AdminDashboard.jsx
│   ├── OfflinePage.jsx
│   └── Footer.jsx
│
├── App.jsx
└── main.jsx
```

---

# 🔑 Admin Portal

Access Route:
```
/admin
```

Example:
```
http://localhost:5173/admin
```

**Data Storage:** Google Sheets  
**Live Sheet:** [View Appointment Data](https://docs.google.com/spreadsheets/d/13rFgvEm_Dnz4gSs0F7PipRpcUwDtrbMW_3j3YA0nTWE/edit?gid=0#gid=0)


Development Credentials:

| Role | Username | Password |
|------|----------|----------|
| Receptionist | admin@lumina.com | lumina123 |

⚠ Production Warning:
- Replace hardcoded credentials
- Implement backend authentication
- Use JWT/session management
- Secure API endpoints

---

# 🚀 Installation (Authorized Use Only)

```bash
cd lumina-health
npm install
npm run dev
```

Open:
```
http://localhost:5173/
```

---

# 🧪 Usage

## Patients
- Browse services
- View doctor profiles
- Book appointments
- Access contact & map

## Receptionists
- Visit `/admin`
- Login securely
- Manage bookings

---

# ⚙️ Configuration

Color Palette:

Primary: #0077b6  
Secondary: #90e0ef  
Background: #ffffff  

Required Assets:
- Hero image
- Doctor portrait
- Clinic interior image
- 3D offline illustration

---

# 📦 Dummy Data Pack

Clinic Name: Lumina Health Clinic  
Tagline: "Compassionate Care, Modern Medicine."

Doctor:
Dr. Sarah Bennett, MD  
Senior General Practitioner & Cardiologist  
15+ Years Experience  
MD from Stanford Medicine  
Residency at Mayo Clinic  

Services:
- General Consultation
- Cardiology
- Pediatrics
- Vaccinations

Contact:
123 Wellness Blvd, Health City, HC 54321  
(555) 123-4567  
appointment@luminahealth.com  

Hours:
Mon–Fri: 9:00 AM – 6:00 PM  
Sat: 10:00 AM – 2:00 PM  

---

# ✅ Project Status

- [x] Vite + React setup
- [x] Tailwind configuration
- [x] Navbar
- [x] Hero section
- [x] Stats bar
- [x] About section
- [x] Services grid
- [x] Doctor profile
- [x] Facilities carousel
- [x] Booking form
- [x] Footer
- [x] Mobile responsiveness
- [x] Login system
- [x] Admin dashboard
- [x] Offline detection system
- [x] Dynamic doctor bio routing
- [x] Production-ready frontend architecture

---

# 🌍 Deployment Status

This project is publicly deployed for:

- Portfolio showcasing
- Client demonstrations
- Business proposals
- Commercial pitching

Public deployment does NOT grant source code rights.

---

# 💼 Commercial Licensing

This project:

- Can be licensed to developers
- Can be customized for clinics
- Can be sold as a commercial solution
- Can be modified under paid agreement

For licensing, customization, or full source access, contact the developer directly.

---

# 🛠️ Troubleshooting

Admin not accessible?
- Ensure login is completed.
- State resets on refresh in dev mode.

Offline page not showing?
- Disable internet in DevTools.
- Verify navigator.onLine logic.

Styling issues?
- Restart development server.
- Check Tailwind configuration.

---

# 📩 Contact

For:

- Paid projects
- Licensing
- Custom development
- Full source purchase
- Business inquiries

Contact:

Developer: **M SUBHAM**  
Email: **msubham246@gmail.com**  
LinkedIn: *[msubham](https://www.linkedin.com/in/msubham/)*  

---

# 📜 License & Restrictions

All rights reserved.

This software is private intellectual property.

You may NOT:

- Share source publicly
- Upload to public repositories
- Redistribute without permission
- Claim ownership

Commercial licensing available upon request.

---

# 🚀 Final Note

Lumina Health Clinic Web App is a premium, commercially viable clinic management frontend system featuring:

- Secure receptionist dashboard
- Dynamic routing
- Offline resilience
- Professional UI architecture

Built for real-world deployment, client presentations, and scalable healthcare solutions.
