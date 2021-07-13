/**
 * Dans cette partie, Nous allons réalise un vrai test de notre API REST via une web app
 *  -   axios   : module pour faire des appels APIs REST http
 *  -   twig    : le moteur de template
 */
//1-    Importation des modules
    const express = require('express')
    const twig = require('twig')
    const axios = require('axios')
//2-    Les variables globales
    const app = express()
    const PORT_NUMBER = 3000

    const instance = axios.create({
        baseURL :'http://localhost:8086/api/v1/'
    })
//3-    Les middlewares
    app.use(express.json()) // for parsing application/json
    app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
//4-    Les routes
    //Route pour la liste des catégories
    app.get('/categories',(req,res)=>{

        axios.get('http://localhost:8086/api/v1/categories/')
             .then((resultat)=>{

                res.render('categories.twig',{listeCat : resultat.data})
             })
             .catch((err)=>{
                res.render('error.twig',{errorMsg : err.message})
             })
    })
    //Route pour la suppression d'une catégorie
    app.get('/delete/:id',(req,res)=>{
        instance({
            method : 'delete',
            url : '/categories/'+req.params.id
        })
        .then(()=>{
            res.redirect('/categories')
        })
        .catch((err)=>{
            //res.send('Erreur ' + err.message)
            res.render('error.twig',{errorMsg : err.message})
        })
    })
    //Route pour l'ajout d'une catégorie
        // la route en get affichera tout simplement le formulaire d'ajout d'une catégorie
        app.get('/addCategorie',(req,res)=>{
            res.render('form_categorie.twig')
        })
        //la route en poste fera un appel API REST en post, c'est à dire vers le back 
        app.post('/addCategorie',(req,res)=>{
            instance({
                method : 'post',
                url : '/categories',
                data : {
                    libelle : req.body.libelle
                }
            })
            .then(()=>{
                res.redirect('/categories')
            })
            .catch((err)=>{
                res.render('error.twig',{errorMsg : err.message})
            })
        })


//5-    Démarrage de l'instance ou du serveur conrrespondant au front
app.listen(PORT_NUMBER,()=>{
    console.log('Server Front running on port : ' + PORT_NUMBER + " http://localhost:"+PORT_NUMBER)
})