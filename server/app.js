const express = require('express')
const app = express()

const users = require('./users.json')

app.use(express.json())

app.get('/', (req, res) => {
    let obj = { key: 'value' }
    res.send(obj)
})

app.get('/users', (req, res) => {
    res.send(users)
})

app.post('/users', (req, res) => {
    let user = req.body
    console.log(req.body)
    res.status(201).send(user)
})

app.get('/users/:id', (req, res) => {
    console.log(req.params)
    let { id:uID } = req.params
    // console.log(`id: ${id}`)
    // console.log(`User id: ${userid}`)
    res.send(users.find(u => u.id == uID))
})


app.listen(3000, () => console.log('Express server is running!'))
