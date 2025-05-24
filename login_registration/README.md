# Login and Registration Module

This module contains the Flask application for handling user login and registration functionalities. It provides routes for user authentication and registration processes.

## Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd flask-multi-container-app/login_registration
   ```

2. **Install Dependencies**
   Make sure you have Python and pip installed. Then, install the required packages:
   ```bash
   pip install -r requirements.txt
   ```

3. **Run the Application**
   You can run the Flask application using the following command:
   ```bash
   python app.py
   ```
   By default, the application will run on `http://127.0.0.1:5000`.

## Usage Examples

### Register a New User
To register a new user, send a POST request to `/register` with the following JSON body:
```json
{
    "username": "your_username",
    "password": "your_password",
    "nombre": "Your Name"
}
```

### User Login
To log in, send a POST request to `/login` with the following JSON body:
```json
{
    "username": "your_username",
    "password": "your_password"
}
```

## API Endpoints

- **POST /register**: Register a new user.
- **POST /login**: Authenticate a user.

## Notes
Ensure that your database is set up correctly and that the connection details in `app.py` are accurate for successful operation.