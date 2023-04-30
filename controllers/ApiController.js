const db = require('../database/data');

/**
 * Retourne une liste de tous les personnages présent dans la base de donnée.
 * 
 * @param {*} req   Demande reçue.
 * @param {*} res   Retourne un message avec une liste des personnages.
 */
module.exports.index = (req, res) => {
    res.json({msg: "Récupération de la liste des personnages.", db}); // 200 OK
};

/**
 * Retourne un personnage selon l'id auquel il est lié.
 * 
 * @param {*} req   Demande reçue.
 * @param {*} res   Retourne le personnage avec ses informations.
 */
module.exports.show = (req, res) => {
    let personnage = db.find(({ id }) => id == req.params.id);

    if (personnage == undefined) {
        reponsePersonnageIntrouvable(res); // Erreur 404 NOT FOUND
    }

    res.json({msg: "Récupération d'un personnage par son ID.", personnage}); // 200 OK
};

/**
 * Stocke un personnage dans la base de donnée.
 * Le nom réel du personnage peut-être vide.
 * 
 * @param {*} req   Demande reçue.
 * @param {*} res   Retourne un message avec la liste des personnages.
 */
module.exports.store = (req, res) => {
    validationNomPersonnage(req.query.name, res); // Erreur 422 UNPROCESSABLE CONTENT ou void
    creationPersonnage()    
};

/**
 * Fait une mise à jour d'un personnage selon nom du personnage et fait un changement du nom réel du personnage.
 * Le nom réel du personnage peut-être vide.
 * Si aucun personnage avec le même nom est trouvé, un nouveau personnage sera créer.
 * 
 * @param {*} req   Demande reçue.
 * @param {*} res   Retoure un message avec la liste des personnages.
 */
module.exports.update = (req, res) => {
    //validationNomPersonnage(req.query.name, res); // Erreur 422 UNPROCESSABLE CONTENT ou void

    let index = db.findIndex(db => db.name == req.query.name);

    if (index == -1) {
        creationPersonnage()
    }

    if (req.query.name != null) {
        db[index].name = req.query.name
    }

    if (req.query.realname != null) {
        db[index].realname = req.query.realname
    }
    
    res.json({msg: "Modification d'un personnage.", db}); // 200 OK
};

/**
 * Supprime un personnage dans la base de donnée selon l'id.
 * 
 * @param {*} req   Demande reçu.
 * @param {*} res   Retourne un message avec la liste des personnages.
 */
module.exports.delete = (req, res) => {
    let index = db.findIndex(db => db.id == req.params.id);

    if (index == -1) {
        reponsePersonnageIntrouvable(res); // Erreur 404 NOT FOUND
    }

    db.splice(index, 1);

    res.json({msg: "Suppression d'un personnage.", db}); // 200 OK
};

function creationPersonnage(name, realname, res)
{
    let personnage = {
        id: 0,
        name: name,
        realname: realname
    }

    db.push(personnage);

    res.status(201).json({msg: "Création d'un personnage.", db}); // 201 Created
}

/**
 * La fonction fait une validation du nom du personnage selon s'il y a quelque chose dans la variable.
 * 
 * @param {*} name  Nom du personnage.
 * @param {*} res   Erreur 422 avec message.
 */
function validationNomPersonnage(name, res)
{
    let msg = null;

    if (name == null || name == undefined) {
        msg = "Le nom du personnage est requie.";
    }

    /*if (name) {
        msg = "Le nom du personnage ne doit contenir que des chiffres, des lettres et des espaces.";
    }*/

    if (msg != null) {
        res.status(422).json({msg: msg});
    }
}

/**
 * La fonction retourne le statut 404 quand aucun personnage n'est trouvé.
 * 
 * @param {*} res   Erreur 404 avec message.
 */
function reponsePersonnageIntrouvable(res)
{
    res.status(404).json({msg: "Le personnage est introuvable."});
}