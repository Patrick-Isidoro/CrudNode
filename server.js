const express = require('express')
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))

const ObjectID = require('mongodb').ObjectID
const MongoClient = require('mongodb').MongoClient
const uri = "";

MongoClient.connect(uri, (err, client) => {
    if (err) return console.log(err)
    db = client.db('crud-nodejs') // coloque o nome do seu DB

    app.listen(3000, () => {
        console.log('Server running on port 3000')
    })
})

//Tipo de template engine
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.get('/', (req, res) => {
    const cursor = db.collection('data').find()
})

app.get('/show', (req, res) => {
    db.collection('data').find().toArray((err, results) => {
        if (err) return console.log(err)
        res.render('show.ejs', { data: results })

    })
})

app.post('/show', (req, res) => {
    db.collection('data').save(req.body, (err, result) => {
        if (err) return console.log(err)

        console.log('Salvo no Banco de Dados')
        res.redirect('/show')
    })
    db.collection('data').update({ "_id": new ObjectID("id") }, (err, result) => {
        if (err) return console.log(err)
    })
})