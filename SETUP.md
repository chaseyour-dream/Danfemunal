# Danphe Munal - Setup Guide

## Prerequisites

- Python 3.8+ installed
- Node.js 16+ and npm installed
- Git (optional)

## Backend Setup (Django)

1. Navigate to backend directory:
```bash
cd backend
```

2. Create and activate virtual environment:
```bash
python -m venv venv
venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Run migrations:
```bash
python manage.py makemigrations
python manage.py migrate
```

5. Create superuser for admin access:
```bash
python manage.py createsuperuser
```
Follow the prompts to create your admin account.

6. Start the development server:
```bash
python manage.py runserver
```

The backend will be available at: http://localhost:8000
Admin panel: http://localhost:8000/admin

## Frontend Setup (React)

1. Open a new terminal and navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will be available at: http://localhost:3000

## Initial Data Setup

1. Access the admin panel at http://localhost:8000/admin
2. Login with your superuser credentials
3. Add data in this order:

### Categories
- Go to Products > Categories
- Add categories (vegetable, bee_keeping, ayurvedic_medicine, beauty_products, ganja_tshirt, fish)

### Products
- Go to Products > Products
- Add products with images, prices, and descriptions
- Assign them to categories

### Services
- Go to Services > Services
- Add service items with title, subtitle, and images
- Set the order for carousel display

### Team Members
- Go to Team > Team Members
- Add shareholders and board members with photos and details

### Payment QR
- Go to Orders > Payment QR Codes
- Upload your payment QR code image
- Set it as active

## Project Structure

```
danphe-munal/
├── backend/
│   ├── danphe_munal/        # Django project settings
│   ├── products/            # Products app
│   ├── services/            # Services app
│   ├── team/                # Team members app
│   ├── orders/              # Orders and payments app
│   ├── media/               # Uploaded files
│   └── manage.py
│
└── frontend/
    ├── src/
    │   ├── components/      # Reusable components
    │   ├── pages/           # Page components
    │   ├── context/         # React context (Cart)
    │   ├── api/             # API calls
    │   └── App.jsx
    └── package.json
```

## Features Checklist

✅ Product catalog with 6 categories
✅ Product cards with images, prices, and add to cart
✅ Services carousel with auto-slide
✅ Shopping cart with add/remove functionality
✅ Dual payment options (Cash & QR)
✅ QR payment with screenshot upload
✅ Team section with shareholders and board members
✅ Fully responsive design with Tailwind CSS
✅ Django Jazzmin admin panel
✅ REST API with Django REST Framework

## Troubleshooting

### Backend Issues

**Port already in use:**
```bash
python manage.py runserver 8001
```

**Database errors:**
```bash
python manage.py migrate --run-syncdb
```

### Frontend Issues

**Port already in use:**
Edit `vite.config.js` and change the port number.

**Module not found:**
```bash
rm -rf node_modules package-lock.json
npm install
```

## Production Deployment

### Backend
1. Set `DEBUG = False` in settings.py
2. Configure `ALLOWED_HOSTS`
3. Set up a production database (PostgreSQL recommended)
4. Configure static files serving
5. Use gunicorn or uwsgi

### Frontend
1. Build the production bundle:
```bash
npm run build
```
2. Serve the `dist` folder with nginx or similar

## Support

For issues or questions, please contact the development team.
