//1-    Importation des modules

    const express = require('express') // on intègre le module express a notre projet (app.js)
    const app = express()   // création de l'instance ou objet du module express

//2-    Gestion des middlewares
    app.use(express.json()) // for parsing application/json
    app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
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
                .post((req,res)=>{
                    //1-     Ajout d'un produit
                        //1-1   Création de l'objet a inséré
                            /* Condition ternaire
                                let age = prompt('Votre age sVP')
                                if(age >= 18){
                                    console.log("Vous êtes majeur")
                                }else{
                                    console.log('Vous êtes mineur)
                                }
                                condition  ?  cas ou condition vrai : cas ou condition fausse
                                    age >= 18 ?  console.log("Vous êtes majeur") : console.log('Vous êtes mineur)
                            */
                        let prod = {
                            id :  produits[produits.length - 1].id + 1,
                            nom : req.body.nom == undefined ? '' : req.body.nom ,
                            description :   req.body.description == undefined ? '' : req.body.description ,
                            prix : req.body.prix == undefined ? 0 : req.body.prix,
                            stock : req.body.stock == undefined ? 0 : req.body.stock
                        }
                        //1-2   Test de récupération des paramètres
                            //res.send(prod)
                            //Parcourir le tableau
                            // let trouver = false
                            // for(let i = 0;i<produits.length;i++){
                            //     //récupéartion de chaque élément du tableau
                            //     if(produits[i].nom == req.body.nom){
                            //         trouver = true
                            //         break;
                            //     }
                            // }
                        let trouver = isSameNameProd(req.body.nom)
                        //1-3   Ajout de l'objet produit dans le tableau
                        if(!trouver){
                            produits.push(prod)
                            res.send('Produit ajouté avec succes')
                        }else{
                            res.send('Ce produit existe déjà dans la base')
                        }
                })
            ProduitRouter.route('/:id')
                .get((req,res)=>{
                    // récupération de l'index (position dans le tableau) connaissant l'id
                    // let index = -1
                    // for(let i = 0;i<produits.length;i++){
                    //     if(produits[i].id == req.params.id){
                    //         index = i
                    //         break;
                    //     }
                    // }

                    let index = getIndexProduit(req.params.id)
                    // Test de la variable index
                    if(index != -1){ // if(getIndexProduit(req.params.id) != -1)
                        res.send(produits[index])
                    }else{
                        res.send('Ce Produit n\'existe pas dans la base ')
                    }

                })
                .delete((req,res)=>{
                    //1-    Récupération de l'index (position ) de l'élément a supprimé du tableau via son id
                        let index = getIndexProduit(req.params.id)
                    //2-    On teste la valeur de la variable index (qui peut égale à -1 ou autre valeur)
                        if(index != -1){
                            // cas ou le produit existe dans la base
                            produits.splice(index,1);
                            res.send('Produit supprimé avec succes !')
                        }else{
                            res.send('Ce produit n\'existe pas dans la base')
                        }
                })    
    //Création du middleware de gestion du routeur ProduitRouter
            app.use(ROOT_URL,ProduitRouter)  
//n-    Démarrage de l'instance du module express
        app.listen(PORT_NUMBER,()=>{
            console.log('Server started on port : '+PORT_NUMBER+' http://localhost:'+PORT_NUMBER)
        })
//n+1   Autres fonctions
function getIndexProduit(idProd){
    //1-    Déclaration de la variable index( position dans le tableau)
    let index = -1
    for(let i = 0 ; i < produits.length;i++ ){
        if(idProd == produits[i].id){
            index = i
            break;
        }
    }
    return index
}
function isSameNameProd(nomProd){
    //1-    Déclaration de la variable booleenne trouver
        let trouver = false
    //2-    Parcours du tableau
        for(let i =0 ;i <produits.length;i++){

            if(nomProd == produits[i].nom){
                trouver = true
                break
            }
        }
    //3-    Retouner la valeur de la variable booléenne trouver
    return trouver
}