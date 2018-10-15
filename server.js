const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const ObjectId = require('mongodb').ObjectID
const MongoClient = require('mongodb').MongoClient
const uri = "mongodb://patrickisidoro:nuzor1539@ds133279.mlab.com:33279/crud-nodejs";

app.use(bodyParser.urlencoded({ extended: true }))

MongoClient.connect(uri, (err, client) => {
  if (err) return console.log(err)
  db = client.db('crud-nodejs') // coloque o nome do seu DB

  app.listen(3000, () => {
    console.log('Server running on port 3000')
  })
})

//Tipo de template engine
app.set('view engine', 'ejs')

app.route('/') //setado a rota, e abaixo as ações a serem tomadas dentro desta rota
.get(function(req, res) {
  const cursor = db.collection('data').find()
  res.render('index.ejs')
})

.post((req, res) => {
  db.collection('data').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('Salvo no Banco de Dados')
    res.redirect('/show')
  })
})

app.route('/show')
.get((req, res) => {
  db.collection('data').find().toArray((err, results) => {
    if (err) return console.log(err)
    res.render('show.ejs', { data: results })
  })
})

app.route('/edit/:id')
.get((req, res) => {
  var id = req.params.id

  db.collection('data').find(ObjectId(id)).toArray((err, result) => {
    if (err) return res.send(err)
    res.render('edit.ejs', { data: result })
    // console.log(ObjectId(id))
  })
})
.put((req, res) => {
  var id = req.params.id
  var name = req.body.name
  var surname = req.body.surname

  db.collection('data').findOneAndUpdate(ObjectId(id), {
    $set: {
      name: name,
      surname: surname
    }
  }, (err, result) => {
    if (err) return res.send(err)
    res.redirect('/show')
    console.log(name)
    console.log('Atualizado no Banco de Dados')
  })
})

app.route('/delete/:id')
.get((req, res) => {
  var id = req.params.id

  db.collection('data').findOneAndDelete(ObjectId(id), (err, result) => {
    if (err) return res.send(500, err)
    console.log('Deletado do Banco de Dados!')
    res.redirect('/show')
  })
})