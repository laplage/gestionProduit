/**
 * Dans cette partie, Nous allons réalise un vrai test de notre API REST via une web app
 *  -   axios   : module pour faire des appels APIs REST http
 *  -   twig    : le moteur de template
 */
//1-    Importation des modules
    const express = require('express')
    var twig = require('twig')

//2-    Les variables globales
    const app = express()
    const PORT_NUMBER = 3000

//3-    Les middlewares


//4-    Les routes
    app.get('/',(req,res)=>{
        //La fonction sendFile prend a paramètre le chemin Absolu
        //console.log(__dirname)
        
        //res.send('test du chemin Absolu : ' + __dirname)
        //res.sendFile(__dirname+'/views/index.html')

        //Utilisation de twig (moteur de template)
       //res.render('index.twig',{nom : "Francis Laplage"})
       //récupération d'un paramètre

        let tabNom = ["Bart","Lisa","Omer","Maggie"]


        //res.render('index.twig',{nom : req.params.nom})
        res.render('index.twig',{ listeNom : tabNom})

    })
    app.get('/:nom',(req,res)=>{
        res.render('index.twig',{nom : req.params.nom})
    })

//5-    Démarrage de l'instance ou du serveur conrrespondant au front
app.listen(PORT_NUMBER,()=>{
    console.log('Server Front running on port : ' + PORT_NUMBER + " http://localhost:"+PORT_NUMBER)
})