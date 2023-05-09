**Liste des personnages**
----
  Retourne une liste de tous les personnages qui se trouve dans la base de donnée.

* **URL**

  /api/personnages

  exemple : http://localhost/api/personnages
  
* **Méthodes:**
  
  `GET` : Pour recevoir une liste de personnages.

* **Réponse de succès:**

  * **Code:** 200 <br />
    **Contenu:** `{
        "msg": "Récupération de la liste des personnages réussie.",
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
 
* **Réponses d'erreur:**

  * **Code:** 204 NO CONTENT <br />
    **Contenu:** `{ "msg": "La liste des personnages est vide." }`
    
* **Exemple:**
 
    axios.get('/personnages')
	 	.then(response => console.log(response))
	 	.catch(error => console.log(error));
    