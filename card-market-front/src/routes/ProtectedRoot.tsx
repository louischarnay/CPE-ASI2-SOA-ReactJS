import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
    element: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
    // Remplacez 'auth.isAuthenticated' par votre propre logique d'authentification
    const currentUser = useSelector((state: any) => state.userReducer.currentUser)

    // Si l'utilisateur n'est pas authentifié, le rediriger vers la page de login
    if (currentUser === null) {
        return <Navigate to="/login" replace />;
    }

    return element;
};

export default ProtectedRoute;
