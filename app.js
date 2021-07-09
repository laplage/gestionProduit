//1-    Importation des modules

    const express = require('express') // on intègre le module express a notre projet (app.js)
    const app = express()   // création de l'instance ou objet du module express

//2-    Gestion des middlewares

//3-    Les variables globales
        const PORT_NUMBER = 8085
        const ROOT_URL = '/api/v1/produits'
        var produits = [
                        {id:1,nom:'Les Misérables',description:'Livre',prix:25,stock:125},
                        {id:2,nom:'Node.js pour les nuls',description:'Livre',prix:55,stock:25},
                        {id:3,nom:'Fifa 2021',description:'Jeu de foot PS4',prix:35,stock:250},
                        {id:4,nom:'MacBook Air',description:'Ram 4GO,Ordidinateur',prix:1100,stock:10},
                        ]
    //création du routeur
        var ProduitRouter = express.Router()     
         
//4-    Création des routes
                /**
                 * Pour la gestion des produits par notre API REST, nous réalise les opérations suivantes:
                 *  -   Afficher la liste de tous les produits via la fonction get()
                 *  -   Afficher un produit connaissant son id via la fonction get()
                 *  -   Ajouter un produit dans la base (Array de produits) via la fonction post()
                 *  -   Supprimer un produit existant dans la base connaissant son id via la fonction delete()
                 *  -   Mettre à jour les données d'un produit existant dans la base connaissant son id via la fonction PUT()
                 */
            ProduitRouter.route('/')
                .get((req,res)=>{
                    res.send(produits)
                })
            ProduitRouter.route('/:id')
                .get((req,res)=>{
                    // récupération de l'index (position dans le tableau) connaissant l'id
                    let index = -1
                    for(let i = 0;i<produits.length;i++){
                        if(produits[i].id == req.params.id){
                            index = i
                            break;
                        }
                    }
                    // Test de la variable index
                    if(index != -1){
                        res.send(produits[index])
                    }else{
                        res.send('Ce Produit n\'existe pas dans la base ')
                    }
                })
                         
    //Création du middleware de gestion du routeur ProduitRouter
            app.use(ROOT_URL,ProduitRouter)  
//n-    Démarrage de l'instance du module express
        app.listen(PORT_NUMBER,()=>{
            console.log('Server started on port : '+PORT_NUMBER+' http://localhost:'+PORT_NUMBER)
        })