const express = require('express');

const server = express();

// your code here

const accounts = require('./data/accounts-model')

server.use(express.json())

server.get('/api/accounts', (req, res) => {
    accounts.find()
    .then(acc => {
        res.status(200).json({acc})
    })
    .catch(error => {
        res.status(500)
        .json({ error: "info cannot be retrieved" })
    })
}) 

server.get('/api/accounts/:id', async (req, res) => {
    const id = req.params.id
    accounts.findById(id)
    .then(acc => {
        res.status(200).json(acc)
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({ error: "the account id could not be retrieved"})
    })
})

server.post('/api/accounts', async (req, res) => {
    const newAccount = req.body
    if ( !newAccount.name || !newAccount.budget) {
        res.status(400).json({ message: 'please fill out the name and budget' })
    } else {
        await accounts.add(newAccount)
        .then(acc => {
            res.json({message: "you have created the account: ", acc})
        })
        .catch(error => {
            res.status(500).json({ error: "failed to add a new account" })
        })
    }
})

server.put('/api/accounts/:id', (req, res) => {
    const updateAccount = req.body;
    const id = req.params.id;
    accounts.update(id, updateAccount)
    .then(acc => {
        res.status(200).json({ message: "you have updated this account" })
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ error: "could not update the account" })
    })
})

server.delete('/api/accounts/:id', async (req, res) => {
    const id = req.params.id;
    const count = await accounts.remove(id);
    if (count > 0) {
        res.status(200).json({ message: "the account has been deleted" })
    } else {
        res.status(404).json({ message: 'the account could not be found' })
    }
})

module.exports = server;