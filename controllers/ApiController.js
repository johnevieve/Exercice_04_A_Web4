const db = require('../database/data');

module.exports.index = (req, res) => {
    res.json({msg: "Tous les personnages.", db});
};

module.exports.show = (req, res) => {
    let personnage = db.find(({ id }) => id == req.query.id);

    if (personnage === undefined) {
        res.status(404).json({msg: "Personnage introuvable"});
    }

    res.json({msg: "Un seul personnage.", personnage});
};

module.exports.store = (req, res) => {
    //if (req.params.)

    /*let personnage = {
        
    }*/
    
    res.json({msg: "Personnage ajouté.", db});
};

module.exports.update = (req, res) => {
    //db.
    res.json({msg: "Màj d'un personnage.", db});
};

module.exports.delete = (req, res) => {
    let index = db.findIndex(db => db.id == req.query.id);

    if (index == -1) {
        res.status(404).json({msg: "Personnage introuvable"});
    }

    db.splice(index, 1);

    res.json({msg: "Personnage supprimé.", db});
};