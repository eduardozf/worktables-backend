# Weather API

This project is a tiny REST API to fetch weather data for a given country using the WeatherAPI.

## Features

- REST API architecture
- Node.js with Express.js
- TypeScript for type safety
- Fetch weather data from WeatherAPI
- WeatherAPI Fallback
- Basic error handling

## Setup

1. Clone the repository:

   ```sh
   git clone https://github.com/eduardozf/worktables-backend.git
   cd worktables-backend
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add your WeatherAPI key:

   ```plaintext
   PORT=3000
   WEATHER_API_KEY=your_api_key
   OPEN_WEATHER_MAP_API_KEY=your_api_key
   ```

4. Run the server:
   ```sh
   npm start
   ```

## Usage

- The API has a single endpoint to fetch weather data for a given country:
  ```
  GET /api/weather?lat=-25&long=-49
  ```
