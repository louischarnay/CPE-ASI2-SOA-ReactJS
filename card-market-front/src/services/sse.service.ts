export const startSse = (url: string, onMessage: (data: string) => void, onError: (error: Event) => void) => {
    const eventSource = new EventSource(url);

    eventSource.onmessage = (event) => {
        onMessage(event.data); // Callback pour gérer les messages reçus
    };

    eventSource.onerror = (error) => {
        onError(error); // Callback pour gérer les erreurs
        eventSource.close(); // Fermer la connexion en cas d'erreur
    };

    return () => {
        eventSource.close(); // Retourner une fonction de nettoyage
    };
};
