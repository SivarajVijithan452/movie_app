## Project Overview

The Movie App is a modern web application built using React, a popular JavaScript library for building user interfaces. The application leverages React hooks such as `useState`, `useEffect`, and `useMemo` to manage state, handle side effects, and optimize performance. For routing, the app utilizes `react-router-dom`, enabling navigation between different views like Home, Favorites, Movie Details, and Search Results.

### Development and Technologies

The application is developed with a focus on clean, maintainable code and a responsive user interface. It follows component-based architecture, where reusable components and pages are organized in a modular structure. The `react-router-dom` library is employed to handle client-side routing, allowing users to navigate between pages seamlessly. React Context is used for managing global state, particularly for handling movie favorites.

### Data Handling

Movie data is fetched from a local JSON file (`data.json`) located in the `public/data/` directory. This file contains an array of movie objects with details such as `id`, `title`, `imageUrl`, `year`, `genre`, `synopsis`, and optionally `rating`. The `useEffect` hook is used to load this data when the application initializes. For searching, the app filters the movie list based on user queries and updates the view dynamically.

### Code Structure

The project is structured with a clear separation of concerns:
- **Components**: Reusable UI elements and functional components are stored in the `src/components/` directory.
- **Pages**: Different page views like Home, Favorites, Details, and Search are located in the `src/pages/` directory.
- **Contexts**: Application-wide state management is handled by context providers found in `src/contexts/`.
- **App.js**: The central component that configures routing and renders the appropriate page based on the URL.
- **Index.js**: The entry point of the application, which initializes and renders the `App` component into the DOM.

- **`src/components/`**: Contains reusable UI components used across the application.
- **`src/pages/`**: Contains page components for different views such as Home, Favorites, Details, and Search.
- **`src/contexts/`**: Includes context providers for global state management.
- **`src/App.js`**: The main component that sets up routing and renders the page components.
- **`src/index.js`**: The entry point that initializes and renders the `App` component into the DOM.
- **`public/data/data.json`**: Contains movie data used by the application.

The code efficiently manages state and side effects to deliver a smooth user experience. For instance, the `Home` component fetches and displays movies with pagination and genre filtering, while the `Favorite` component allows users to manage their list of favorite movies. The `SearchPage` component provides real-time search functionality by filtering movies based on user input. This approach ensures that the application is both functional and responsive, providing a user-friendly experience across different devices.


## Technologies Used

- **React**: For building the user interface with a component-based approach.
- **React Router**: For client-side routing and navigation.
- **React Context**: For global state management.
- **Tailwind CSS**: For utility-first CSS styling and responsive design.

### Design and CSS Setup

The application's design is centered around a clean, modern aesthetic with a dark theme to enhance readability and visual appeal. CSS is handled using Tailwind CSS, a utility-first CSS framework that simplifies the styling process and ensures a responsive design across different devices.

#### Tailwind CSS Integration

1. **Installation**: Tailwind CSS is installed via npm:
npm install tailwindcss

## Context Usage

The Movie App leverages React Context for managing global state, specifically for handling the favorites feature. React Context provides a way to share state across components without the need for prop drilling, which is especially useful in a large application where multiple components need to access and update the same data.

### Why Use React Context?

In this application, React Context is used to manage the list of favorite movies across different components. This approach was chosen for several reasons:

1. **Global State Management**: The favorites data needs to be accessible from various parts of the application, including the Home page, Favorite page, and Details page. React Context allows us to maintain this global state efficiently.

2. **Avoid Prop Drilling**: Without Context, passing the favorites state and related functions through multiple layers of components (prop drilling) would be cumbersome and error-prone. Context simplifies the state management by providing a central place to access and update the data.

3. **Separation of Concerns**: By using Context, we separate the state management logic from the UI components, making the codebase more modular and easier to maintain.

### Functions in Context

The `FavoritesContext` provides several functions to manage the favorites state. Here’s a breakdown of each function:

1. **`addFavorite(movie)`**:
   - **Purpose**: Adds a movie to the list of favorites.
   - **How It Works**: This function is called with a movie object, and it updates the state by adding the movie to the `favorites` array.
   - **Usage**: This function is used when a user clicks the "Add to Favorites" button on a movie card.


In the Movie App, we use `FavoritesContext` to manage the global state related to user favorites. This approach was chosen for several key reasons:

1. **Centralized State Management**: The `FavoritesContext` provides a centralized place to manage the state of favorite movies across different components. This centralization helps avoid prop drilling, which can become cumbersome when passing state through multiple levels of nested components.

2. **Persistence Across Sessions**: By utilizing the browser's local storage, the `FavoritesContext` ensures that user preferences are persisted across different sessions. This means that the list of favorite movies remains intact even if the user closes and reopens the application. The context initializes the state with saved favorites from local storage and updates it whenever changes are made.

3. **Separation of Concerns**: The `FavoritesContext` helps keep the state management logic separate from the UI components. This separation promotes better organization of code and makes it easier to maintain and test.

### How It Works

The `FavoritesContext` is implemented as follows:

The FavoritesProvider component initializes the favorites state with data from local storage or as an empty array if no data is found. It provides functions to manage the favorites, such as adding or removing movies, and checking if a movie is already favorited.

addFavorite(movie): Adds a movie to the favorites list and updates local storage.
removeFavorite(id): Removes a movie from the favorites list based on its ID and updates local storage.
isFavorite(id): Checks if a movie is in the favorites list by its ID.

## Installation Instructions

To set up and run this project follow these steps:

### Prerequisites

Ensure you have the following installed on your computer:

- **Node.js**: Version 14.x or higher
- **npm** (Node Package Manager): Comes with Node.js installation

### 1. Clone the Repository

Start by cloning the repository to your local machine. Open your terminal and run:

git clone https://github.com/SivarajVijithan452/movie_app.git


