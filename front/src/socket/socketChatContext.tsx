import config from '../config/config.json'
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

// Définir le type de contexte
interface SocketChatContextType {
    chatSocket: Socket | null;
}

// Créer le contexte avec une valeur initiale
const SocketChatContext = createContext<SocketChatContextType>({ chatSocket: null });

// Fournisseur de contexte
export const SocketChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [chatSocket, setChatSocket] = useState<Socket | null>(null);

    useEffect(() => {
        // Créer une instance socket
        const newSocket = io(config.socketUrl); // Remplacez par l'URL de votre serveur
        setChatSocket(newSocket);

        return () => {
        // Nettoyer le socket à la destruction
            newSocket.disconnect();
        };
    }, []);

    return (
        <SocketChatContext.Provider value={{ chatSocket }}>
            {children}
        </SocketChatContext.Provider>
    );
};

// Hook personnalisé pour utiliser le contexte de socket
export const useSocket = () => {
    return useContext(SocketChatContext);
};
