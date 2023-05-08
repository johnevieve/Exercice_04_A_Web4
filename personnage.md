**Exemple d'un point d'entrée**
----
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

* **URL**

  /personnage?name=**&realname=** <br />
  /personnage?id2=*:id2*
  
* **Méthodes:**
  
  `POST` : Ajoute un personnage avec un nom et sont nom réelle | 

  `PUT` : Mise à jour du nom réelle du personnage selon le nom ou ajoute un nouveau personnage
  
* **Paramètres d'URL:**

  **Requis:**
 
   `id=[integer]`
   
	**Optionnel:**
	
	`id2=[integer]`
	
* **Paramètres de données:**

  **Requis:**
 
   `param=[alphanumeric]`

* **Réponse de succès:**

  * **Code:** 200 <br />
    **Contenu:** `{ 
    					data : {
							...
						}
 					}`
 
* **Réponses d'erreur:**

  * **Code:** 400 BAD REQUEST <br />
    **Contenu:** `{ "error": "Malformed request syntax." }`    
    
    OU

  * **Code:** 401 UNAUTHORIZED <br />
    **Contenu:** `{ "message": "Unauthenticated." }`
    
* **Exemple:**
 
        axios.post('/super-api/blablabla/1', { param: 'blabla' })
	 	  .then(response => console.log(response))
	 	  .catch(error => console.log(error));
    