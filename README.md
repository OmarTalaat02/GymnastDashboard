# Gymnast Dashboard

## Overview
The **Gymnast Dashboard** is an interactive data visualization and management application for analyzing gymnastics performance data. Built with modern web technologies, the dashboard provides detailed insights into apparatus performance, execution scores, and difficulty scores. It includes user-friendly features such as sorting, filtering, and pagination for an enhanced user experience.

## Features

- **Dynamic Data Visualizations**: Interactive bar charts showcasing apparatus performance and detailed rankings.
- **Filtering and Sorting**:
  - Sort by name, nationality, execution score, difficulty score, total score, and rank.
  - Filter data by apparatus to focus on specific events.
- **Paginated Dataset View**: Displays 24 gymnasts per page for easy navigation.
- **User-Friendly Interface**: Modern and responsive design for seamless interaction.

## Technologies Used

### Frontend
- **React.js**: For building the interactive and responsive user interface.
- **Chart.js**: For creating visually appealing and dynamic charts.
- **CSS**: For custom styling and modern layouts.

### Backend
- **Java Spring Boot**: For handling business logic and API development.
- **PostgreSQL**: For robust and efficient data storage.
- **Hibernate/JPA**: For object-relational mapping and database interaction.

## Installation and Setup

### Prerequisites
- Java 17 or above
- Spring Boot CLI installed (optional, for running the backend locally)
- PostgreSQL installed and configured
- Node.js (v14 or above) installed

### Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/OmarTalaat02/GymnastDashboard.git
   ```

2. **Set up the backend**:
   - Navigate to the backend directory:
     ```bash
     cd ..\GymnastDashboard

     ```
   - Configure your `application.properties` file in `src/main/resources` to include the database connection:
     ```properties
     spring.datasource.url=jdbc:postgresql://localhost:5432/<your_database_name>
     spring.datasource.username=<your_database_username>
     spring.datasource.password=<your_database_password>
     spring.jpa.hibernate.ddl-auto=update
     ```
   - Run the backend:
     ```bash
     mvn spring-boot:run
     ```

3. **Set up the frontend**:
   - Navigate to the frontend directory:
     ```bash
     cd ..\gymnast-dashboard-frontend git:[main]
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the frontend:
     ```bash
     npm start
     ```

4. **Set up Maven (Optional)**:
   - If Maven is not already installed on your system, follow these steps:
     - Download Maven from [Maven Official Website](https://maven.apache.org/download.cgi).
     - Follow the installation instructions for your operating system.
   - Verify Maven installation:
     ```bash
     mvn -v
     ```
   - You can then use Maven commands such as:
     ```bash
     mvn clean install
     mvn spring-boot:run
     ```

### Usage
- Open your browser and navigate to `http://localhost:[port #]` to access the Gymnast Dashboard.

## Screenshots
*(Add screenshots showcasing the dashboard, dataset table, and visualizations.)*

## Acknowledgments
- **Chart.js**: For dynamic and interactive data visualizations.
- **React.js**: To create a modern and intuitive frontend.
- **Java Spring Boot**: Powering the backend logic and API.
- **PostgreSQL**: For reliable and scalable data management.
