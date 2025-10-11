# Anime - Anime Discovery Web Application

This is a full-stack anime discovery and tracking web application developed with React, Tailwind CSS, the Jikan API (for anime data), and Appwrite (for backend services, database management, and trending metrics).

Originally inspired by a YouTube tutorial focused on creating a movie app, this project evolved into a custom anime-themed platform through my experimentation and design choices. It represents my first complete full-stack project and served as a foundational experience in understanding end-to-end web application development - from frontend UI to backend integration and data management.

While the project’s scope remains modest, it was an invaluable learning process for mastering backend as a service integration, asynchronous API handling, and creating a cohesive user experience within a modern JavaScript ecosystem.

------------------------------------------------------------

## Overview

This project enables users to explore, search, and track anime titles dynamically while generating trending data based on search interactions. It integrates public anime data from the Jikan API and records user search metrics using Appwrite’s database services.

The result is a responsive (Not yet but will very soon), visually consistent, and data-driven web experience that combines real-time updates, structured UI components, and performance optimization techniques.

------------------------------------------------------------

## What I Learned

- Appwrite as a Backend as a Service (BaaS)
  - Setting up and managing Appwrite projects, databases, and collections.
  - Configuring permissions and connecting the frontend to Appwrite using its JavaScript SDK.
  - Performing document creation, reading, and updates programmatically (for example: updateSearchCount, getTrendingMovies).

- API Integration
  - Consuming public RESTful APIs responsibly, with rate-limiting considerations and error handling.
  - Parsing, validating, and displaying dynamic API responses efficiently.

- React Development Practices
  - Managing component state effectively and implementing debounced API calls for optimized performance.
  - Structuring reusable components such as AnimeCard, Search, and Spinner.
  - Handling asynchronous operations, loading indicators, and error boundaries.

- Styling and Responsiveness
  - Utilizing Tailwind CSS for rapid and consistent UI development.
  - Creating responsive layouts that adapt seamlessly across different devices and screen sizes.

- Project Architecture
  - Organizing project files for clarity, scalability, and maintainability.
  - Applying clean code principles, modular design, and separation of concerns.

------------------------------------------------------------

## Features

| Feature | Description |
|----------|--------------|
| Search Functionality | Allows users to search for anime titles via the Jikan API. |
| Trending System | Generates a dynamic list of trending anime titles using data collected from Appwrite search metrics. |
| Metrics Tracking | Updates the Appwrite database with each search request, storing relevant metadata such as ID, title, and image URL. |
| Serverless Backend | Utilizes Appwrite to handle database operations (create, read, update) without traditional server management. |
| Responsive Design | Fully responsive grid and card layouts styled with Tailwind CSS. |
| Debounced Input | Reduces redundant API calls by delaying search execution while typing. |

------------------------------------------------------------

## Technology Stack

Frontend
- React (v19.2.0.)
- Tailwind CSS
- react-use (useDebounce hook)

Backend / Database
- Appwrite Cloud (BaaS platform)

External API
- Jikan API (v4) — Public Anime Data API

Hosting
- Vercel

------------------------------------------------------------

## Project Structure

src/
├─ components/
│  ├─ Search.jsx
│  ├─ Spinner.jsx
│  ├─ AnimeCard.jsx
│
├─ appwrite.js       # Appwrite client initialization and helper functions
├─ App.jsx           # Root application component
├─ index.css         # Global Tailwind styles
└─ main.jsx          # Application entry point

------------------------------------------------------------

## Development Insights

This project demonstrated the practical use of Appwrite as a backend-as-a-service for rapid prototyping and metric tracking. By integrating client-side search analytics with a cloud database, it simulates a real-world data-driven application while maintaining performance and reliability.

Additionally, the use of React and Tailwind CSS provided a structured foundation for building component-based UIs efficiently, ensuring both consistency and scalability in design.

------------------------------------------------------------

## License and Usage Terms

This project is provided for demonstration and learning purposes only.
It is not open-source and is not available for public use, copying, modification, or redistribution in any form.

All rights are reserved by the author.

- You may view and study the code for educational or reference purposes.
- You may not copy, clone, fork, reuse, or redistribute any part of this project’s code or design.
- You may not host, publish, or claim authorship of this project or any derivative works.
- Written consent from the author is required for any form of usage or reference beyond personal review.

Copyright © 2025 Rashel Hossen. All Rights Reserved.
