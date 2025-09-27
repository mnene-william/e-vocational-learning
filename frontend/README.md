SkillLearn - Full Stack Learning Platform

SkillLearn is a full-stack educational platform built with Django (backend) and React (frontend). It allows users to:

Access lessons across multiple vocational skills (e.g., Plumbing, Electricity, Tailoring, etc.)

Watch lesson videos and read accompanying notes

Take quizzes to test knowledge

Track learning progress

Submit reviews and feedback

Table of Contents

Features

Tech Stack

Getting Started

API Endpoints

Running the Application

Contributing

License

Features

User Authentication & Profiles:

Register, login, and manage profile

Track lesson and quiz progress

Lessons Management:

Categorized lessons with videos and textual content

Supports multiple vocational skills

Quiz System:

Multiple-choice quizzes per lesson

Immediate feedback and score tracking

Progress Tracking:

Tracks lesson completion and quiz performance

Visual progress bars for easy monitoring

Reviews:

Submit ratings and comments for lessons

Search:

Quickly search lessons by keyword

Responsive UI:

Built with Tailwind CSS and React for an optimal experience on all devices

Tech Stack

Backend: Django, Django REST Framework, PostgreSQL

Frontend: React, React Router, Tailwind CSS, Axios

Authentication: JWT (JSON Web Tokens)

Media Storage: Cloudinary (for lesson and profile images/videos)

API Testing: Postman

Version Control: Git/GitHub

Getting Started
Prerequisites

Python 3.9+

Node.js 18+

npm or yarn

Git

PostgreSQL

Backend Setup

Clone the repository:

git clone https://github.com/yourusername/learnsmart.git
cd Capstone/backend


Create and activate a virtual environment:

python -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate     # Windows


Install dependencies:

pip install -r requirements.txt


Configure environment variables:
Create a .env file in the backend root:

DJANGO_SECRET_KEY=your_secret_key
DEBUG=True
DATABASE_URL=postgres://user:password@localhost:5432/dbname
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret


Apply migrations:

python manage.py migrate


Create a superuser (admin):

python manage.py createsuperuser

Frontend Setup

Navigate to the frontend directory:

cd ../frontend


Install dependencies:

npm install
# or
yarn install


Start the React development server:

npm start
# or
yarn start


Open http://localhost:3000
 in your browser.

API Endpoints
Endpoint	Method	Description
/api/skills/	GET, POST	List or create skills/categories
/api/lessons/	GET, POST	List or create lessons
/api/quizzes/	GET, POST	List or create quiz questions
/api/progress/	GET, POST	Track user progress
/api/reviews/	GET, POST	Fetch or submit reviews
/api/contact/	POST	Submit contact messages
/api/profile/	GET, PUT	View or edit user profile
/user/register/	POST	Register a new user
/token/	POST	Obtain JWT access token
/token/refresh/	POST	Refresh JWT token
Running the Application
Start Django Backend:
cd backend
python manage.py runserver

Start React Frontend:
cd frontend
npm run dev


Visit http://localhost:3000
 to view the app.

Contributing

Fork the repository

Create a new branch:

git checkout -b feature/YourFeature


Make changes and commit:

git commit -m "Add new feature"


Push to the branch:

git push origin feature/YourFeature


Open a Pull Request

License

This project is licensed under the MIT License
