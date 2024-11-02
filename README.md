# 🌐 Projet de Groupe ASI2 - CPE Lyon

## 👥 Membres du Groupe 

| Nom                |
|--------------------|
| **Louis Charnay**  |
| **Léon Dumestre**  |
| **Nathan Guillemette** |
| **Dorian Gorse**   |

---

## ▶️ Lancement du projet

Avant de commencer, il est nécessaire de créer une clé API pour générer des images. Pour cela, rendez vous sur le site de [Neural Love](https://docs.neural.love/docs/getting-started).
Ensuite, créer un fichier `.env` à la racine du projet. Le contenu du fichier doit être semblable à celui de `.env.example` mais avec votre clé API générée au préalable.

Pour lancer les containers Docker, executez la commande suivante :
```
docker-compose up --build
```

---

## 🚀 Activités Réalisées

### 📌 Louis Charnay
#### Back-End
- Mise en place des conteneurs Docker
- Développement du **CardGenerator**
- Intégration de l'**ESB** dans **imageGenerator**
- Intégration de l'**ESB** dans **descriptionGenerator**
- Intégration de l'**ESB** dans **propsGenerator**
- Développement du **SSE** côté back

### 📌 Léon Dumestre
#### Front-End
- Initialisation du projet React en typescript

#### Back-End
- Mise en place des conteneurs Docker
- Développement du **Card Image Generator**
- Développement du **Card Description Generator**
- Création du **Card Properties Generator** et implémentation de la librairie
- Modification de la partie monolithique pour l'adapter à notre architecture
- Implémentation du container **Neural Love** pour générer des cartes
- Implémentation du container **Ollama** pour générer des descriptions

### 📌 Nathan Guillemette

#### Front-End
- Travail préliminaire de découpage des pages en **composants**  
- Instanciation des différentes **pages** de l'application
- Mise en place de **react-router**
- Mise en place de **Redux**
- Mise en place de **Material UI**
- Développement de la **page d'Authentification**
- Développement de la **page d'Accueil**
- Développement de la **page de génération d'image**
- Développement de tous les **services** appellant le **Back-End**
- Développement du **SSE** côté front (dont gestion d'erreur ou de réussite de la génération de carte)

### 📌 Dorian Gorse

#### Front-End
- Développement du **component Card**
- Développement du **component Card List**
- Développement du **component Card Preview**
- Mise en place de la **navigation sécurisée nécessitant une authentification**
- Animation de **chargement des listes** et affichage des **messages d’erreurs**
- Ajout d’une **Snackbar** pour confirmer les actions d’achat et de vente

#### Back-End
- Implémentation du **Card Properties Generator** pour la génération dynamique des propriétés de carte

---

## 📝 Fonctionnalités Réalisées

- **Application React** : Frontend pour l’interface utilisateur
- **Backend Monolithique** : Gestion centralisée des cartes et des utilisateurs
- **Service d’Images et Propriétés** : Génération dynamique d'images, descriptions et propriétés des cartes

---

## ❌ Fonctionnalités Non Réalisées
(vide)

---

## 🔗 Liens

- **GitHub Repository** : [CPE-ASI2-SOA-ReactJS](https://github.com/louischarnay/CPE-ASI2-SOA-ReactJS)

