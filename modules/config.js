const mysql = require('mysql')

//1- les variables
exports.PORT_NUMBER = 8086
exports.URL_ROOT = '/api/v1/categories',
exports.URL_ROOT_PROD = '/api/v1/produits'

exports.db =  mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'gestion_produits'
})