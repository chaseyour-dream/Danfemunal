# Danphe Munal - Agricultural Trading Company

A modern, full-stack e-commerce platform for agricultural products with React frontend and Django backend.

## Project Structure

```
danphe-munal/
├── backend/          # Django REST API with Jazzmin admin
└── frontend/         # React application with Tailwind CSS
```

## Features

- Product catalog with categories (Vegetables, Bee Keeping, Ayurvedic Medicine, Beauty Products, Ganja T-shirt, Fish)
- Dynamic services carousel
- Shopping cart with add/remove functionality
- Dual payment options (Cash on Delivery & QR Payment)
- Team section with Shareholders and Board Members
- Fully responsive design
- Django Jazzmin admin panel

## Setup Instructions

### Backend Setup
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

## Tech Stack

- Frontend: React, Tailwind CSS, Axios
- Backend: Django, Django REST Framework, Jazzmin
- Database: SQLite (development)
