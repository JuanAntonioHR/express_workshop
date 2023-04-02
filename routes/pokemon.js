const express = require('express')
const mysql = require('mysql')
const pokemon = express.Router()
const db = require('../config/database')

pokemon.post("/", (req, res, next) => {
    return res.status(200).send(req.body)
})

pokemon.get('/', async (req, res, next) => {
    const pkmn = await db.query("SELECT * FROM pokemon")
    return res.status(200).json(pkmn)
})

pokemon.get('/:id([0-9]{1,3})', async (req, res, next) => {
    const id = req.params.id

    console.log(id)

    if (id <= 722) {
        let searchQuery = "SELECT * FROM pokemon WHERE pok_id = ?"
        let query = mysql.format(searchQuery, [id])
        const  pkmn = await db.query(query)

        if (pkmn.length > 0) {
            return res.status(200).json(pkmn)
        }
    }

    return res.status(404).send("Pokémon no encontrado")
})

pokemon.get('/:name([A-Za-z]+)', async (req, res, next) => {
    const name = req.params.name

    let searchQuery = "SELECT * FROM pokemon WHERE pok_name = ?"
    let query = mysql.format(searchQuery, [name.toLowerCase()])
    const pkmn = await db.query(query)

    if (pkmn.length > 0) {
        return res.status(200).json(pkmn)
    }
    
    return res.status(404).send("Pokémon no encontrado")
    
})

module.exports  = pokemon