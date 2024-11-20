import config from '../config/config.json'
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

// Définir le type de contexte
interface SocketContextType {
    socket: Socket | null;
}

// Créer le contexte avec une valeur initiale
const SocketContext = createContext<SocketContextType>({ socket: null });

// Fournisseur de contexte
export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        // Créer une instance socket
        const newSocket = io(config.socketUrl); // Remplacez par l'URL de votre serveur
        setSocket(newSocket);

        return () => {
        // Nettoyer le socket à la destruction
            newSocket.disconnect();
        };
    }, []);

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};

// Hook personnalisé pour utiliser le contexte de socket
export const useSocket = () => {
    return useContext(SocketContext);
};
