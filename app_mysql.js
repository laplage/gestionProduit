//1-    Importation des modules
    const mysql = require('mysql')


//2-    Création de l'objet de connexion

    const db = mysql.createConnection({
        host : 'localhost',
        user : 'root',
        password : '',
        database :  'gestion_produits',
        port : 3306
    })

//3-    Connexion à la base de données via l'objet de connexion 
    db.connect((err)=>{
        // test de la connexion à la base de données
        if(err){
            console.log('Erreur ' + err.message)
        }else{
            console.log('Connected ! ')
            /* Test des requêtes :
                -   Afficher la liste des catégories (SELECT)
                -   Afficher une catégorie précise connaissant son id (SELECT et WHERE) 
                -   Rechercher les catégories commancant par une lettre ou contenant un mot ou une lettre (SELECT et LIKE)
                -   Ajout d'une nouvelle catégorie (INSERT INTO)
                -   Suppression d'une catégorie (DELETE)
            */      
           
                //  Récupération de la liste de toutes les catégories
                db.query('SELECT * FROM categories',(err,data)=>{
                    if(err){
                        console.log('Erreur : ' + err.message)
                    }else{
                        console.log(data)
                    }
                })
                let idCat = 3;
                //  Récupération  d'une catégorie précise connaissant son id (Passage de paramètre à la requête SQL)
                db.query('SELECT * FROM categories WHERE id = ? ',[idCat],(err,data)=>{
                    if(err){
                        console.log('Erreur : ' + err.message)
                    }else{
                        console.log(data[0])
                    }
                })
                // //  Test de l'ajout d'une catégorie 
                let id = 
                    nomCat = "VOITURES"
                    //INSERT INTO `categories`(`id`, `libelle`) VALUES ([value-1],[value-2])
                db.query('INSERT INTO categories(id,libelle) values(default,?)',[nomCat],(err)=>{
                    if(err)
                        console.log("Erreur d'insertion " + err.message)
                    else
                        console.log('Insertion effectuée avec succes')
                })
                // //  Cas avec plusieurs paramètres : Mise à jour
                let id = 5
                    nouveauNom = "VELOS"
                    //UPDATE `categories` SET `id`=[value-1],`libelle`=[value-2] WHERE 1
                    db.query('UPDATE categories SET libelle = ? WHERE id = ?',[nouveauNom,id],(err)=>{
                        if(err)
                            console.log('Erreur de Mise-à-jour ' + err.message)
                        else    
                            console.log('Mise-à-jour effectuée avec succes')
                    })
                // La suppression d'une catégorie dans la base de données
                let id = 5
                //DELETE FROM `categories` WHERE 0
                db.query('DELETE FROM categories WHERE id = ? ',[id],(err)=>{
                    if(err)
                        console.log('Erreur de suppression '+ err.message)
                    else    
                        console.log('Catégorie supprimée avec succes')
                })

        }
    })