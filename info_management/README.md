# Information Management API

This directory contains the Flask application for managing information related to workshops or services. The application provides endpoints to retrieve and update information about available workshops.

## Setup Instructions

1. **Clone the repository**:
   ```
   git clone <repository-url>
   cd flask-multi-container-app/info_management
   ```

2. **Install dependencies**:
   It is recommended to use a virtual environment. You can create one using:
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```
   Then install the required packages:
   ```
   pip install -r requirements.txt
   ```

3. **Run the application**:
   You can start the Flask application by running:
   ```
   python app.py
   ```
   The application will be accessible at `http://localhost:5000`.

## Usage Examples

- **Get all workshops**:
  ```
  GET /talleres
  ```

- **Get details of a specific workshop**:
  ```
  GET /talleres/<id>
  ```

- **Update workshop information**:
  ```
  PUT /talleres/<id>
  ```

Make sure to refer to the `app.py` file for specific endpoint details and request/response formats.