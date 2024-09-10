import React, { Suspense, lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from '../App';

// Lazy load the components to split the code and improve performance
const Home = lazy(() => import('../pages/Home'));
const DetailsPage = lazy(() => import('../pages/DetailsPage'));
const SearchPage = lazy(() => import('../pages/SearchPage'));
const Favourite = lazy(() => import('../pages/Favourite'));

// Create a router configuration using createBrowserRouter
const router = createBrowserRouter([
    {
        path: '/',  // Base path for the application
        element: <App />,  // Layout component that wraps around all the nested routes
        children: [
            {
                path: '',  // Default path (home page)
                element: (
                    // Suspense component to handle lazy loading of the Home page
                    <Suspense fallback={<div>Loading Home...</div>}>
                        <Home />  
                    </Suspense>
                )
            },
            {
                path: 'explore/:id',  // Path for movie details, using a dynamic segment for the movie ID
                element: (
                    // Suspense component to handle lazy loading of the DetailsPage
                    <Suspense fallback={<div>Loading Details...</div>}>
                        <DetailsPage />  
                    </Suspense>
                )
            },
            {
                path: 'search',  // Path for the search page
                element: (
                    // Suspense component to handle lazy loading of the SearchPage
                    <Suspense fallback={<div>Loading Search...</div>}>
                        <SearchPage />  
                    </Suspense>
                )
            },
            {
                path: 'favorites',  // Path for the favorites page
                element: (
                    // Suspense component to handle lazy loading of the Favourite page
                    <Suspense fallback={<div>Loading Favorites...</div>}>
                        <Favourite /> 
                    </Suspense>
                )
            }
        ]
    }
]);

export default router;
