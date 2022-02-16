# Installation du backend

## Tech Stack

**Server:** Node, Express, Sequelize, MySQL

## Prérequis

- Vous devez avoir React, Node et MySQL d'installé sur votre machine.
- Vérifiez que les informations contenues dans config.json correspondent à vos identifiants MySQL

## Installation

```bash
cd server
npm install
npx sequelize-cli db:create groupomania
npx sequelize-cli db:migrate
npm start
```

## Environment Variables

Pour que ce projet fonctionne, il faut créer un fichier .env dans le dossier config, et ajoutez ces trois lignes :

```bash
PORT=5000
JWT_SECRET_TOKEN=<définissez votre token>
CLIENT_URL=http://localhost:3000
```

## Bases des routes

```http
/api/user
/api/post
```

### Routes d'authentification

- Création de compte

```http
POST /register
```

- Connexion à un compte

```http
POST /login
```

- Se déconnecter du compte

```http
GET /logout
```

## Routes d'utilisateur

- Récuperer les informations d'un utilisateur

```http
GET /:id
```

- Récupérer les informations de tous les utilisateurs

```http
GET /
```

- Mettre à jour le profil d'un utilisateur

```http
PUT /upload/:id
```

- Supprimer un utilisateur

```http
DELETE /:id
```

## Routes de publications

- Créer une publication

```http
POST /
```

- Récupérer toutes les publications

```http
GET /
```

- Récupérer une publication

```http
GET /:id
```

- Mettre à jour une publication

```http
PUT /:id
```

- Supprimer une publication

```http
DELETE /:id
```

- Mettre un like ou annuler son like à une publication

```http
POST /:id/like
```

- Récupérer tous les likes d'un utilisateur

```http
GET /:id/likes
```

## Routes des commentaires

- Ajouter un commentaire à une publication

```http
POST /:id/comment
```

- Récupérer tous les commentaires d'une publication

```http
GET /comments/:id
```

- Supprimer un commentaire d'une publication

```http
DELETE /comment/:id
```

## Authors

- [@d-walid](https://www.github.com/d-walid)
