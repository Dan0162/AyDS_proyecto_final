# Payment Functionality Documentation

This directory contains the Flask application responsible for handling payment processing within the multi-container application. 

## Overview

The payment service is designed to manage payment confirmations and related functionalities for the workshops or services offered in the application. It interacts with the database to update reservation statuses upon successful payment.

## Setup Instructions

1. **Clone the Repository**: 
   Clone the repository to your local machine using:
   ```
   git clone <repository-url>
   ```

2. **Navigate to the Payment Directory**:
   Change into the payment directory:
   ```
   cd flask-multi-container-app/payment
   ```

3. **Install Dependencies**:
   Install the required Python packages using pip:
   ```
   pip install -r requirements.txt
   ```

4. **Run the Application**:
   Start the Flask application:
   ```
   python app.py
   ```

   The application will be accessible at `http://localhost:5000/pagar` for payment processing.

## Usage Examples

- **Confirm Payment**:
  To confirm a payment, send a POST request to the `/pagar` endpoint with the following JSON body:
  ```json
  {
      "usuario_id": 1,
      "taller_id": 2
  }
  ```

  A successful response will indicate that the payment has been confirmed.

## Additional Information

For more details on the overall project structure and other functionalities, refer to the main `README.md` file located in the root directory of the project.