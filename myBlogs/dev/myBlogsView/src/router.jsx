// src/components/AppRouter.js
import React, { useState, useEffect } from 'react';
import Home from './home';
import Blog from './blog';

const AppRouter = () => {
  const [currentRoute, setCurrentRoute] = useState(window.location.pathname);

  useEffect(() => {
    const handleRouteChange = () => {
      setCurrentRoute(window.location.pathname);
    };

    window.addEventListener('popstate', handleRouteChange);

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  // Define a function to render the appropriate component based on the route
  const renderRoute = () => {
    switch (currentRoute) {
    //   case '/':
    //     return <Home />;
      case '/blog':
        return <Blog />;
      default:
        return <div>Page not found</div>;
    }
  };

  return <div>{renderRoute()}</div>;
};

export default AppRouter;
