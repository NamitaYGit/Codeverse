# CSVerse — Collaborative Knowledge Exchange Platform

## 📝 Project Description

CSVerse is a **collaborative knowledge exchange platform** designed for **students, clubs, professors, and lifelong learners**.  
The platform allows users to:

- Share their knowledge in a well-structured format (descriptions, sources, video lectures).
- Access high-value educational content contributed by peers.
- Support creators by purchasing their content — rewarding high-caliber contributors.

The aim is to foster **collaborative learning and creativity while rewarding contributors for their expertise**.

## 🔹 Features

- **User Authentication (OAuth)** with **Google** and **Github**.
- Collaborative content upload with **Cloudinary** for media storage.
- **React Player** for large video playback.
- **Paid content** with payments processed through **Stripe** (sandbox).
- **Editor with rich text (Quill)** for adding descriptions and educational notes.

## ⚙ Tech Stack

### Frontend:

- **React (Vite) + React Router** for routing
- **Redux Toolkit** for state management
- **@react-oauth** for OAuth authentication
- **Cloudinary** for media storage
- **React Player** for video playback
- **React Quill** for rich text editors
- **Framer Motion** for smooth animations
- **shadcn UI (radix-ui)** for UI components
- **Vite + ESLint + Prettier** for a smooth developer experience
- **Sonner** for notifications

### Backend:

- **Node.js (Express)** for the API
- **JWT** for authentication
- **Bcrypt** for password hashing
- **Mongodb/Mongoose** for data persistence
- **Multer** for media upload
- **Stripe** for payments (currently in sandbox)
- **Cors, Cookie-Parser, Dotenv** for additional functionality

## 🔹 Installation

```bash
git clone https://github.com/NamitaYGit/Codeverse.git
cd client
npm installl
npm run dev
cd ..
cd server
npm install
npm run dev
cd ..
stripe listen --forward-to localhost:8000/api/v1/purchase/webhook
```

Now you’re all set to log in — whether as an instructor to publish content or as a student eager to learn. The platform is ready to serve !
