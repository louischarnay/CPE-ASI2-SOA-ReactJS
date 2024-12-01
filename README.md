# 🌐 Projet de Groupe ASI2 - CPE Lyon

## 👥 Membres du Groupe 

| Nom                |
|--------------------|
| **Louis Charnay**  |
| **Léon Dumestre**  |
| **Nathan Guillemette** |
| **Dorian Gorse**   |

---

## 🌐 Lien du GitHub

https://github.com/louischarnay/CPE-ASI2-SOA-ReactJS/tree/atelier-2

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
- Intégration de l'**ESB** dans **backendGame**
- Développement du backend spring de logging
- Développement du backend spring d'historisation des messages
- Mise en place du service **Nginx**
- Mise en place du load-balancing

### 📌 Léon Dumestre
#### Back-End NodeJS
- Création du backend **NodeJS** avec typescript
- Implémenation des **sockets**
- Création de la **logique du jeu**
- Implémentation du **chat écrit**
- Implémentation des **bonnes pratiques** dans le backend Node
- Dialogue entre le backend Node et le monolithique pour récupérer les infos des cartes et utilisateurs

### 📌 Nathan Guillemette

#### Front-End
- Développement du **Chat et components associés**
- Développement du **déroulement d'une partie**
- Développement de la **page GameRoom**
- Mise en place des **websockets** du chat
- Mise en place des **websockets** d'une partie  

### 📌 Dorian Gorse

#### Front-End
- Développement de la **page GamePrep**
- Développement de **la selection de carte**
- Développement du **component des cartes joueur**
- Développement **recherche de partie**
- Mise en place des **websockets** de recherche
- Remaniement des **websockets** avec mise en place **d'un context** 

#### Back-End
- Correction de bug sur **les websockets**

---

## 📝 Fonctionnalités Réalisées

- **Application React** : Frontend pour l’interface utilisateur avec un chat écrit et un jeu
- **Backend NodeJS** : Backend avec des sockets pour gérer le chat et le jeu ainsi que l'ESB pour logs les actions
- **Backend Spring** : Sauvegarde de logs et historisation des messages

---

## ❌ Fonctionnalités Non Réalisées
(vide)

---

## 🔗 Liens

- **GitHub Repository** : [CPE-ASI2-SOA-ReactJS](https://github.com/louischarnay/CPE-ASI2-SOA-ReactJS)

