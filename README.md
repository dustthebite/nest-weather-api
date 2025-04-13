## Description

This project is a weather API built with NestJS and PostgreSQL, using Docker for containerization. It fetches weather data from the OpenWeather API, stores selected parts in a PostgreSQL database, and provides formatted access to that data.

The API and the database are containerized separately and orchestrated using Docker Compose.

To run the application, you must create a .env file in the root directory with the required environment variables.

## Example .env

POSTGRES_HOST=weather-db
POSTGRES_PORT=5432
POSTGRES_USER=your_db_user
POSTGRES_PASSWORD=your_db_password
POSTGRES_DB=your_db_name
WEATHER_API_KEY=your_openweather_api_key

Be sure to replace placeholder values with your actual credentials.
