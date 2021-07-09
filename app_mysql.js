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
        }
    })