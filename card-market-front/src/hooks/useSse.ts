import { useEffect } from "react";
import { startSse } from "../services/sse.service";

const useSse = (url: string, onMessage: (data: string) => void, onError: (error: Event) => void) => {
    useEffect(() => {
        const cleanup = startSse(url, onMessage, onError); // Initialiser la connexion SSE

        return () => cleanup(); // Nettoyage lors du démontage du composant
    }, [url, onMessage, onError]);
};

export default useSse;
