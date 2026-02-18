# Hero Image Setup Instructions

## Adding Hero Image via Django Admin

1. Start the Django backend server:
   ```bash
   cd backend
   python manage.py runserver
   ```

2. Access Django Admin:
   - Open browser and go to: http://localhost:8000/admin
   - Login with your admin credentials

3. Add Hero Image:
   - In the admin panel, find "Hero Images" section
   - Click "Add Hero Image"
   - Fill in the form:
     - Title: Enter a descriptive title (e.g., "Home Page Hero")
     - Image: Upload your hero/banner image
     - Is Active: Check this box to make it active
   - Click "Save"

4. The hero image will now appear as the background on the home page

## Notes:
- Only one hero image should be active at a time
- The image will be displayed as a full-screen background with a green overlay
- Recommended image size: 1920x1080 or larger for best quality
- If no hero image is uploaded, the page will show the default green gradient background
