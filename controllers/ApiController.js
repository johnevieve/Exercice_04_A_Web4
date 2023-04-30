const db = require('../database/data');

/**
 * Retourne une liste de tous les personnages présent dans la base de donnée.
 * Si la liste des personnages est vide, il retournera le statut 204 avec un message.
 * 
 * @param {*} req   Demande reçue.
 * @param {*} res   Retourne un message avec une liste des personnages.
 */
module.exports.index = (req, res) => {
    bdEstVide(res); // Erreur 204 No Content ou void

    res.json({msg: "Récupération de la liste des personnages réussie.", db}); // 200 OK
};

/**
 * Retourne un personnage selon l'id auquel il est lié.
 * Si la liste des personnages est vide, il retournera le statut 204 avec un message.
 * 
 * @param {*} req   Demande reçue.
 * @param {*} res   Retourne le personnage avec ses informations.
 */
module.exports.show = (req, res) => {
    bdEstVide(res); // Erreur 204 No Content ou void

    let personnage = db.find(({ id }) => id == req.params.id);

    if (personnage == undefined) {
        reponsePersonnageIntrouvable(res); // Erreur 404 NOT FOUND
    }

    res.json({msg: "Récupération d'un personnage par son ID réussie.", personnage}); // 200 OK
};

/**
 * Stocke un personnage dans la base de donnée.
 * Le nom réel du personnage peut-être vide.
 * 
 * @param {*} req   Demande reçue.
 * @param {*} res   Retourne un message avec la liste des personnages.
 */
module.exports.store = (req, res) => {
    let name = remplacementCharactèresPourEspace(req.query.name);
    let realname = remplacementCharactèresPourEspace(req.query.realname);

    validationPersonnage(name, realname, res); // Erreur 422 UNPROCESSABLE CONTENT ou void
    creationPersonnage(name, realname, res); // 201 Created
};

/**
 * Fait une mise à jour d'un personnage selon nom du personnage et fait un changement du nom réel du personnage.
 * Le nom réel du personnage peut-être vide.
 * Si aucun personnage avec le même nom est trouvé, un nouveau personnage sera créer.
 * Si la liste des personnages est vide, il retournera le statut 204 avec un message.
 * 
 * @param {*} req   Demande reçue.
 * @param {*} res   Retoure un message avec la liste des personnages.
 */
module.exports.update = (req, res) => {
    bdEstVide(res); // Erreur 204 No Content ou void

    let name = remplacementCharactèresPourEspace(req.query.name);
    let realname = remplacementCharactèresPourEspace(req.query.realname);

    validationPersonnage(name, realname, res); // Erreur 422 UNPROCESSABLE CONTENT ou void

    let index = db.findIndex(db => db.name == name);

    if (index == -1) {
        creationPersonnage(name, realname, res); // 201 Created
    }
       
    db[index].name = name;

    if (realname == null) {
        db[index].realname = "Inconnue";
    } else {
        db[index].realname = realname;
    }
    
    res.json({msg: "Modification du personnage réussie.", db}); // 200 OK
};

/**
 * Supprime un personnage dans la base de donnée selon l'id.
 * Si la liste des personnages est vide, il retournera le statut 204 avec un message.
 * 
 * @param {*} req   Demande reçu.
 * @param {*} res   Retourne un message avec la liste des personnages.
 */
module.exports.delete = (req, res) => {
    bdEstVide(res); // Erreur 204 No Content ou void

    let index = db.findIndex(db => db.id == req.params.id);

    if (index == -1) {
        reponsePersonnageIntrouvable(res); // Erreur 404 NOT FOUND
    }

    db.splice(index, 1);

    res.json({msg: "Suppression du personnage réussie.", db}); // 200 OK
};

/**
 * La fonction regarde si la base de donnée est vide ou null et, si cela est le cas,
 * il retourne une réponse avec le statut 204 et un message.
 * 
 * @param {*} res   Erreur 204 avec message.
 */
function bdEstVide(res)
{
    if (bd.length <= 0) {
        res.status(204).json({msg: "La liste des personnages est vide."}); // Erreur 204 No Content
    }
}

/**
 * La fonction ajoute un nouveau personnage dans la base de donnée.
 * 
 * @param {*} name      Nom du personnage.
 * @param {*} realname  Nom réel du personnage.
 * @param {*} res       Réponse 201 créer avec un message.
 */
function creationPersonnage(name, realname, res)
{
    let personnage = {
        id: db[db.length - 1].id + 1,
        name: name,
        realname: realname
    }

    db.push(personnage);

    res.status(201).json({msg: "Création d'un personnage réussie.", db}); // 201 Created
}

/**
 * La fonction remplace tous les charactères ('_') par un espace dans l'enssemble du string.
 * 
 * @param {*} string String avec des charatères ('_') à remplacé.
 * @returns          String avec des charatères remplacé.
 */
function remplacementCharactèresPourEspace(string)
{
    return string.replace(/_/g, ' ');
}

/**
 * La fonction retourne le statut 404 avec un message quand aucun personnage n'est trouvé.
 * 
 * @param {*} res   Erreur 404 avec message.
 */
function reponsePersonnageIntrouvable(res)
{
    res.status(404).json({msg: "Le personnage est introuvable."});
}

/**
 * La fonction fait une validation du nom du personnage selon si la variable est null ou undefined
 * et selon si les charactères sont des chiffres, des lettres, des espaces ou une séparation (_ ou -).
 * 
 * @param {*} name  Nom du personnage.
 * @param {*} res   Erreur 422 avec message.
 */
function validationPersonnage(name, realname, res)
{
    let msg = null;

    if (name == null || name == undefined) {
        msg = "Le nom du personnage est requie.";
    }

    if (/^[\w\s-]+/.test(name) || /^[\w\s-]+/.test(realname)) {
        msg = "Le nom et le nom réel du personnage ne doit contenir que des chiffres, des lettres et des espaces ou une séparation (_ ou -).";
    }

    if (msg != null) {
        res.status(422).json({msg: msg}); // Erreur 422 UNPROCESSABLE CONTENT
    }
}