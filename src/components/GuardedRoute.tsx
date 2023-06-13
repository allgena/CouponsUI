
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

interface GuardedRouteProps {
  element: React.ReactNode;
  path: string;
}

function GuardedRoute({ element: Element, ...rest }: GuardedRouteProps) {
        
        const isLoggedIn = true; 
      
        return (
          <Route
            {...rest}
            element={isLoggedIn ? (
              Element 
            ) : (
              <Navigate to="/login" />
            )}
          />
        );
      }
      export default GuardedRoute;