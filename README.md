GOT est une webapp qui affiche une liste d'épisode de Game of thrones.
Les utilisateurs peuvent liker un épisode et rafraîchir le nombre de likes.

#Installation
	- NodeJs
	- module npm:  expressjs et body-parser

#Lancer le serveur
	node got-server.js

#Utilisation
	L'application est accessible aux urls: http://localhost:3000/ ou http://localhost:3000/index.html

#Fonctionnalités
	● Like
		- lors d'un clique sur le bouton like d'un épisode le nombre de like de cedernier augmente.
		  On peut cliquer qu'une fois sur un like (sauf si on reload la page via le browser)

	● Refresh
		- lors du clique sur le bouton refresh (en haut à droite de la page) lesdonnées (nombre de like) sont actualisées.

