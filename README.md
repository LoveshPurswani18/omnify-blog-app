# Omnify Blog App

A full-stack blogging platform built using **Django REST Framework** and **React**, deployed on **Firebase Hosting** and **Google Cloud Run**.

## Live URL

Frontend: [https://your-firebase-site.web.app](https://your-firebase-site.web.app)  
Backend: [https://omnify-backend-495525526179.asia-south1.run.app](https://omnify-backend-495525526179.asia-south1.run.app)

## Tech Stack  

- **Frontend**: React + Tailwind CSS
- **Backend**: Django + Django REST Framework + SimpleWT
- **Database**: SQLite
- **Authentication**: JWT Auth
- **Deployment**:
  - Backend: Google Cloud Run
  - Frontend: Firebase Hosting

## Features

- User Authentication (Signup/Login/Logout)
- JWT-based session management
- Create, Edit, Delete Blogs
- View all blogs (public), and "My Blogs"
- Paginated dashboard and blog list
- Protected routes
- Clean responsive UI

## Setup Instructions

### Backend (Django)  

1. Clone the repository and go to the backend folder:
   ```bash
   git clone https://github.com/LoveshPurswani18/omnify-blog-app.git
   cd omnify-blog-app/backend

2. Create virtual envirenment:
   ```bash
      python -m venv venv
      source venv/bin/activate

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
  
4. Run Migrations:
   ```bash
   python manage.py migrate

5. Start server locally:
   ```bash
   python manage.py runserver

### Frontend (React)

1. Go to frontend folder:
   ```bash
   cd ../frontend

2. Install dependencies:
   ```bash
   npm install

3. Start dev server:
   ```bash
   npm run dev

## Testing Credentials

- **Username**: test
- **Password**: test99
