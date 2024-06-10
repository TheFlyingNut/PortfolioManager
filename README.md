# Codeshastra_Tabs_Not_Spaces
=======
---
# **PORTFOLIO MANAGEMENT PLATFORM**

## Overview

👋 Welcome to our portfolio management platform! This platform offers a range of features to help you manage your investment portfolio effectively. 

## Features

**Dashboard Overview 📊**
- View comprehensive portfolio performance metrics: current value, invested value, day profit/loss.
- Analyze investment trends with interactive charts and metrics for informed decision-making.

**Asset Management 💼**
- Access detailed information on all assets including market value, average basis, and profit/loss.
- Watchlist assets for future monitoring and receive timely updates and notifications.

**Reports Generation 📝**
- Generate comprehensive reports on portfolio performance and investment history.
- Analyze trends and make data-driven decisions with AI-powered insights and suggestions included in PDF summaries.

### Portfolio Monitoring 📈
- Monitor your monthly investments and track your asset distribution over time.
- Dive into detailed insights for each asset to make informed decisions and optimize your investment strategy.

### Watchlist Management 👀 
- Keep track of assets you're interested in by adding them to your watchlist.
- Receive timely updates and notifications on watchlisted assets to stay informed about market changes.

## Technologies Used 🛠️
- **React**: Frontend framework for building user interfaces
- **Redux**: State management library for managing application state
- **ApexCharts**: Interactive charting library for visualizing data
- **Tailwind CSS**: Utility-first CSS framework for styling components
- **Clerk**: Authentication and user management platform for secure login and authorization
- **FPDF**: For manipulation and creation of PDF using python
- **Gemini**: Google LLM.

## Setup Instructions 🚀

### Clone the Repository
1. Open your terminal.
2. Navigate to the directory where you want to clone the repository.
3. Run the following command:
   ```bash
   https://github.com/Rushikesh197/Codeshastra_Tabs_Not_Spaces.git

### Instructions
1. Navigate to the cloned repository directory.
   ```bash
   cd frontend/portfolio

2. Run the following command to install dependencies:
   ```bash
   npm install

### Usage
1. Start the development server by running:
    ```bash
    npm start
2. Open your browser and go to [http://localhost:3000](http://localhost:3000) to access the portfolio management platform.
3. Log in using your credentials.

# Project Name: PMP Backend

This repository contains the backend codebase for PMP (Portfolio Management Tool). It is built using Django and Django REST Framework, with PostgreSQL as the primary database and TimescaleDB for time-series data storage. The application is containerized with Docker for easier deployment and scalability.

## Installation

To get started with the backend development environment, follow these steps:
a
1. **Clone this repository:**
   ```
   https://github.com/Rushikesh197/Codeshastra_Tabs_Not_Spaces.git
   ```

2. **Navigate to the project directory:**
   ```
   cd backend/portfoliomanagement
   ```

3. **Create a virtual environment:**
   ```
   python -m venv env
   ```

4. **Activate the virtual environment:**
   - On Windows:
     ```
     env\Scripts\activate
     ```
   - On macOS and Linux:
     ```
     source env/bin/activate
     ```

5. **Install dependencies:**
   ```
   pip install -r requirements.txt
   ```

6. **Apply database migrations:**
   ```
   python manage.py migrate
   ```

7. **Start the development server:**
   ```
   python manage.py runserver
   ```

## API Endpoints

### Assets:

#### 1. Asset List/Create
- **URL**: `/assets/`
- **Description**: List and create assets.
- **Methods**: GET (List), POST (Create)
- **Parameters**: None (For POST request, provide JSON payload with asset details)
- **Example Usage**: 
  - To list all assets: `GET /assets/`
  - To create a new asset: `POST /assets/`

#### 2. Asset Retrieve/Update/Delete
- **URL**: `/assets/<str:pk>/`
- **Description**: Retrieve, update, or delete a specific asset by its primary key.
- **Methods**: GET (Retrieve), PUT (Update), DELETE (Delete)
- **Parameters**: `<str:pk>` (Primary key of the asset)
- **Example Usage**: 
  - To retrieve details of an asset: `GET /assets/<str:pk>/`
  - To update details of an asset: `PUT /assets/<str:pk>/`
  - To delete an asset: `DELETE /assets/<str:pk>/`

#### 3. Bulk Insert Assets
- **URL**: `/assets/bulk_insert`
- **Description**: Bulk insert assets from a CSV file.
- **Methods**: POST
- **Parameters**: CSV file containing asset data
- **Example Usage**: 
  - To bulk insert assets from a CSV file: `POST /assets/bulk_insert`

### Asset Pricing:

#### 1. Asset Pricing List/Create
- **URL**: `/asset_pricing/create`
- **Description**: List and create asset pricings.
- **Methods**: GET (List), POST (Create)
- **Parameters**: None (For POST request, provide JSON payload with asset pricing details)
- **Example Usage**: 
  - To list all asset pricings: `GET /asset_pricing/create`
  - To create a new asset pricing: `POST /asset_pricing/create`

### Users:

#### 1. List Users
- **URL**: `/users/list`
- **Description**: List all users.
- **Methods**: GET
- **Parameters**: None
- **Example Usage**: 
  - To list all users: `GET /users/list`

#### 2. Create User
- **URL**: `/users/create`
- **Description**: Create a new user.
- **Methods**: POST
- **Parameters**: JSON payload with user details (name, email, phone)
- **Example Usage**: 
  - To create a new user: `POST /users/create`

#### 3. Delete User
- **URL**: `/users/<str:pk>/delete/`
- **Description**: Delete a specific user by their primary key.
- **Methods**: DELETE
- **Parameters**: `<str:pk>` (Primary key of the user)
- **Example Usage**: 
  - To delete a user: `DELETE /users/<str:pk>/delete/`


# Feel free to explore the platform, interact with its features. Enjoy managing your investment portfolio effectively! 📈💼
---

>>>>>>> 0ca6e0ca1d913652ca1cb051eb542672f28b2d09
