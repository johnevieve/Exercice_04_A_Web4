**Affichage et suppression d'un personnage**
----
  Le GET retourne un personnage selon son Id pour l'affichage. <br />
  Le DELETE fait une suppression d'un personnage dans la base de donnée selon son Id.

* **URL**

  /api/personnage/*[ID]*

  exemple : http://localhost/api/personnage/1
  
* **Méthodes:**
  
  `DELETE` : Pour la suppression d'un personnage | 

  `GET` : Pour l'affichage d'un personnage.

* **Réponse de succès (DELETE):**

    * **Code:** 200 <br />
    **Contenu:** `{
        "msg": "Suppression du personnage réussie.",
    	"data" : {
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

* **Réponse de succès (GET):**

    * **Code:** 200 <br />
    **Contenu:** `{
        "msg": "Récupération d'un personnage par son ID réussie.",
    	"data" : {
            "id": 1,
            "name": "Batman", 
            "realname": "Bruce Wayne"
		}
 	}`
 
* **Réponses d'erreur:**

  * **Code:** 204 NO CONTENT <br />
    **Contenu:** `{ "msg": "La liste des personnages est vide." }`   
    
    OU

  * **Code:** 404 NOT FOUND <br />
    **Contenu:** `{ "msg": "Le personnage est introuvable." }`
    
* **Exemples:**

  * **DELETE:**

        axios.delete('/personnage', { params: 1 })
	    .then(response => console.log(response))
	    .catch(error => console.log(error));

  * **GET:**

        axios.get('/personnage', { params: 1 })
	    .then(response => console.log(response))
	    .catch(error => console.log(error));
    