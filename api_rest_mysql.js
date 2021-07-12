//1-    Importation des modules
    const express = require('express')
    const mysql = require('mysql')

//2-    Création de l'instance de connexion au serveur de base de données MySQL
    const db =  mysql.createConnection({
        host : 'localhost',
        user : 'root',
        password : '',
        database : 'gestion_produits'
    })
//3-    Etablir la connexion via l'objet de connexion db
    db.connect((err)=>{
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
                let PORT_NUMBER = 8086
                    URL_ROOT = '/api/v1/categories'
                //Router
                let CategorieRouter = express.Router()

            //3-    Les middlewares

            //4-    Les différentes routes pour gerer les fonctions http (GET,POST,PUT et DELETE)
                CategorieRouter.route('/:id')
                    //Cette fonction affiche une catégorie connaissant son id
                    .get((req,res)=>{
                        //création de la requête SQL
                        if(req.params.id != undefined){
                            db.query('SELECT * FROM categories WHERE id = ?',[req.params.id],(err,data)=>{
                                if(err)
                                    res.send('Erreur d\'exécution de la requête SQL')
                                else{
                                    if(data[0] != undefined){
                                        res.send(data[0])
                                    }else{
                                        res.send('Wrong ID')
                                    }
                                }
                            })
                        }else{
                            res.send('Vérifiez le paramètre id SVP !')
                        }
                    })
                CategorieRouter.route('/')
                    .get((req,res)=>{
                        /* Récupération des param
                                req.params (ici on récupère les param de ce type : exemple => /api/v1/categorie/:param)
                                req.query( /api/v1/categories?param1=valeur&param2=valeur)
                                req.body (Ici récupère le paramètre dans l'url)
                        */
                       //récupération et test du paramètre limite
                       if(req.query.limite != undefined && req.query.limite > 0){
                            //Création de la requête SQL dans le cas ou nous avons avons une limite
                            let limite = parseInt(req.query.limite)
                            db.query('SELECT * FROM categories LIMIT 0,?',[limite],(err,data)=>{
                                if(err)
                                    res.send('Erreur d\'exécution de la requête SQL : ' + err.message)
                                else
                                    res.send(data)
                            })
                       }else if(req.query.limite != undefined){
                           // dans ce cas de figure le paramètre limite existe mais avec une mauvaise valeur
                            res.send('Mauvaise limite')
                       }else{
                            //Création de la requête SQL dans le cas ou le paramètre limite n'existe pas
                            db.query('SELECT * FROM categories',(err,data)=>{
                                if(err)
                                    res.send('Erreur d\'exécution de la requête SQL ')
                                else
                                    res.send(data)
                            })
                       }

                    })
            app.use(URL_ROOT,CategorieRouter) // cette instruction permet de lier le routeur CategorieRouter à une URL
            //n-    Demarrage du serveur
                app.listen(PORT_NUMBER,()=>{
                    console.log('Server running on port : ' + PORT_NUMBER + ' http://localhost:'+PORT_NUMBER)
                })
            //n+1   Autres fonctions

        }
    })