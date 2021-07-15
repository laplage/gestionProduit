//1-    Importation des modules
    const express = require('express')
    const mysql = require('mysql')

    let mod = require('./modules/config')

//2-    Création de l'instance de connexion au serveur de base de données MySQL
    // const db =  mysql.createConnection({
    //     host : 'localhost',
    //     user : 'root',
    //     password : '',
    //     database : 'gestion_produits'
    // })
//3-    Etablir la connexion via l'objet de connexion db
    mod.db.connect((err)=>{
        if(err)
            console.log('Erreur de connexion : ' + err.message)
        else{
            // cas de connexion
            console.log('Connected !')
        /**
         *  Nous allons dans le module de connexion à la base de données
         *  -   Créer notre API REST de gestion des catégories
         *          -   GET
         *          -   POST
         *          -   PUT
         *          -   DELETE
         *  -   Création du router nommé CategorieRouter pour gérer les différentes routes
         *  -   Démarrer notre serveur
         */
            //1-    Création de l'instance express (Serveur)
                const app = express()
            //2-    Les variables globales
                    //let PORT_NUMBER = module.PORT_NUMBER
                    // URL_ROOT = '/api/v1/categories',
                    // URL_ROOT_PROD = '/api/v1/produits'
                //Router
                let CategorieRouter =  require('./routes/CategorieRouter.js') // express.Router(),
                    ProduitRouter = express.Router()

            //3-    Les middlewares
                app.use(express.json()) // for parsing application/json
                app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

        ProduitRouter.route('/')
                .get((req,res)=>{
                    db.query('SELECT * FROM produits',(err,data)=>{
                        if(err){
                            res.send('Erreur d\'exécution de la requête SQL ' + err.message)
                        }else{
                            res.send(data)
                        }
                    })
                })
                .post((req,res)=>{
                    //INSERT INTO `produits`(`id`, `nom`, `description`, `prix`, `stock`) VALUES ([value-1],[value-2],[value-3],[value-4],[value-5])
                    db.query('INSERT INTO produits values(default,?,?,?,?)',[req.body.nom,req.body.description,req.body.prix,req.body.stock],(err)=>{
                        if(err){
                            res.send('Cette catégorie existe déjà dans le base')
                        }else{
                            res.send('Produit inséré avec succes')
                        }
                    })
                })



/******************************************************************************************** */
            app.use(mod.URL_ROOT,CategorieRouter) // cette instruction permet de lier le routeur CategorieRouter à une URL
            app.use(mod.URL_ROOT_PROD,ProduitRouter)
            //n-    Demarrage du serveur
                app.listen(mod.PORT_NUMBER,()=>{
                    console.log('Server running on port : ' + mod.PORT_NUMBER + ' http://localhost:'+ mod.PORT_NUMBER)
                })

        }
    })