**Ajout et mise à jour d'un personnage**
----
  Le POST ajoute un personnage dans la base de donnée avec le nom et le nom réelle.
  Le PUT fait une recherche dans la base de donnée selon le nom envoyer pour modifier le nom réelle
  et si jamais aucun personnage n'est trouver avec le nom, alors un nouveau personnage sera ajouté.

* **URL**

  /api/personnage?name=*:name*&realname=*:realname*

  exemple : http://localhost/api/personnage?name=Batman&realname=Bruce_Wayne

* **Méthodes:**

  `POST` : Pour l'ajoute un personnage avec un nom et sont nom réelle. | 

  `PUT` : Pour la mise à jour du nom réelle du personnage selon le nom, sinon l'ajoute d'un nouveau personnage quand aucun personnage n'est trouver avec le nom.

* **Paramètres d'URL:**

  **Requis:**

    Content-Type: application/x-www-form-urlencoded

	`name=[alphanumeric]` : Le nom du personnage

  **Optionnel:**

    Content-Type: application/x-www-form-urlencoded

	 `realname=[alphanumeric]` : Le nom réelle du personnage

* **Réponse de succès:**

  * **Code:** 200 <br />
    **Contenu:** `{
      "msg": "Modification du personnage réussie.",
    	"data" :
        db: {
          "id": 1,
          "name": "Batman", 
          "realname": "Bruce Wayne"
		    }, {
          "id": 2,
          "name": "The Penguin", 
          "realname": "Oswald Cobblepot"
        }, {
          "id": 3,
          "name": "Iron Man", 
          "realname": "Tony Stark"
        }, {
          "id": 4,
          "name": "The Hulk", 
          "realname": "Robert Bruce Banner"
        }
 	  }`

  * **Code:** 201 <br />
    **Contenu:** `{
      "msg": "Modification du personnage réussie.",
    	"data" :
        db: {
          "id": 1,
          "name": "Batman", 
          "realname": "Bruce Wayne"
		    }, {
          "id": 2,
          "name": "The Penguin", 
          "realname": "Oswald Cobblepot"
        }, {
          "id": 3,
          "name": "Iron Man", 
          "realname": "Tony Stark"
        }, {
          "id": 4,
          "name": "The Hulk", 
          "realname": "Robert Bruce Banner"
        }
 	  }`
 
* **Réponses d'erreur:**

  * **Code:** 204 NO CONTENT <br />
    **Contenu:** `{ "msg": "La liste des personnages est vide." }`   
    
    OU

  * **Code:** 422 UNPROCESSABLE CONTENT <br />
    **Contenu:** `{ "msg": "Le nom du personnage est requie." }`

      OU

    **Contenu:** `{ "msg": "Le nom et le nom réel du personnage ne doit contenir que des chiffres, des lettres et des espaces ou une séparation (_ ou -)." }`
    
* **Exemples:**

  * **POST:**

        axios.post('/personnage', {
          name: Batman,
          realname: Bruce Wayne
        })
	    .then(response => console.log(response))
	    .catch(error => console.log(error));

  * **PUT:**

        axios.put('/personnage', {
          name: Batman,
          realname: Bruce Wayne
        })
	    .then(response => console.log(response))
	    .catch(error => console.log(error));
