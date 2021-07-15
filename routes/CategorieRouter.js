const express = require('express')
const mysql = require('mysql')
let CategorieRouter = express.Router();
// let mod = require('./modules/config')


// mod.db.connect((err)=>{
/*****************************************API REST : Gestion Catégorie  ****************************************************************/
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
            //Cette fonction permet de supprimer une catégorie existante via son id
            .delete((req,res)=>{
                // On vérifie que le paramètre id existe
                if(req.params.id != undefined ){
                    //Requête de suppression
                        db.query('DELETE FROM categories where id = ?',[req.params.id],(err,data)=>{
                            if(err)
                                res.send('Erreur d\'exécution de la requête SQL')
                            else{
                                if(data.affectedRows !=0)
                                    res.send('Suppression effectuée avec succes')
                                else
                                    res.send('Cette id n\'existe pas en Base')
                            }
                        })
                }else{
                    res.send('Vérifiez le paramètre id')
                }
            })
            .put((req,res)=>{
                //res.send('Je suis dans la fonction put de mise-à-jour !') //Test d'accès à la fonction 
                //1-    Test de l'existence du paramètre id ou libelle
                if(req.body.libelle){
                    //Cas ou le paramètre existe
                    //2-    Vérification de l'existence de la catégorie que l'on souhaite modifier dans la base
                    db.query('SELECT * FROM categories WHERE id = ?',[req.params.id],(err,data)=>{
                        if(err){
                            res.send('Erreur d\'exécution de la requête SQL ' + err.message)
                        }else{
                            //3-    Onvérifie s'il y a un résultat dans la variable data
                            if(data[0] != undefined){
                                //cas ou la catégorie existe dans la base
                                let libelle = req.body.libelle
                                    id = req.params.id
                                db.query('SELECT * FROM categories WHERE libelle = ? AND id != ?',[libelle,id],(err,data)=>{
                                    if(err){
                                        res.send('Erreur d\'exécution de la requête SQL : ' + err.message)
                                    }else{
                                        //On vérifie qu'une autre catégorie à déjà ce libelle( donc, elle existe déjà en base)
                                        if(data[0] != undefined){
                                            res.send('Cette catégorie existe déjà dans la base !')
                                        }else{
                                            //Cas ou la catégorie n'existe pas dans la base, alors on met à jour
                                            let libelle = req.body.libelle
                                            id = req.params.id
                                            db.query('UPDATE categories SET libelle = ? WHERE id = ? ',[libelle,id],(err,data)=>{
                                                if(err){
                                                    res.send('Erreur d\'exécution de la requête SQL : ' + err.message)
                                                }else{
                                                    res.send('Catégorie mise à jour avec succes !')
                                                }
                                            })
                                        }
                                    }
                                })
                            }else{
                                // cas ou la catégorie n'exsite pas en base
                                res.send('Cette catégorie n\'existe pas dans la base')
                            }
                        }
                    })

                }else{
                    //cas ou le paramètre libelle n'existe pas
                    res.send('Vérifier le paramètre libelle')
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
                //recupérationDesID();
                    //Création de la requête SQL dans le cas ou le paramètre limite n'existe pas
                    db.query('SELECT * FROM categories',(err,data)=>{
                        if(err)
                            res.send('Erreur d\'exécution de la requête SQL ')
                        else
                            res.send(data)
                    })
               }

            })
            //Cette fonction permet d'insérer une nouvelle catégorie dans la base de données
            .post((req,res)=>{
                //On teste si le paramètre existe
                if(req.body.libelle){
                    //On Teste si la valeur du paramètre (libelle catégorie) existe dans la base
                    db.query('SELECT * FROM categories WHERE libelle = ? ',[req.body.libelle],(err,data)=>{
                        if(err)
                            res.send('Erreur d\'exécution de la requête SQL')
                        else{
                            if(data[0] != undefined){
                                //Dans ce blog la catégorie existe dans la base
                                res.send('Cette gatégorie existe déjà dans la base')
                            }else{
                                //Dans ce blog, la catégorie n'existe dans la base
                                db.query('INSERT INTO categories(libelle) values(?)',[req.body.libelle],(err)=>{
                                    if(err){
                                        res.send('Erreur '+ err.message)
                                    }else{
                                        res.send('Catégorie insérée avec succes!')
                                    }
                                })
                            }
                        }
                    })
                }else{
                    res.send('Vérifiez le paramètre Libelle')
                }
                // recuperationDesID(req,res);
            })
// })
/**************************************************************Fin API REST : Gestion Catégorie  **********************************/
