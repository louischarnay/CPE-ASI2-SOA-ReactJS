import config from '../config/config.json'
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

// Définir le type de contexte
interface SocketGameContextType {
    gameSocket: Socket | null;
}

// Créer le contexte avec une valeur initiale
const SocketGameContext = createContext<SocketGameContextType>({ gameSocket: null });

// Fournisseur de contexte
export const SocketGameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [gameSocket, setGameSocket] = useState<Socket | null>(null);

    useEffect(() => {
        // Créer une instance socket
        const newSocket = io(config.socketUrl); // Remplacez par l'URL de votre serveur
        setGameSocket(newSocket);

        return () => {
        // Nettoyer le socket à la destruction
            newSocket.disconnect();
        };
    }, []);

    return (
        <SocketGameContext.Provider value={{ gameSocket }}>
            {children}
        </SocketGameContext.Provider>
    );
};

// Hook personnalisé pour utiliser le contexte de socket
export const useSocket = () => {
    return useContext(SocketGameContext);
};
