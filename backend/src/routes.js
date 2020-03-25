const express = require('express')
const OngController = require('./controller/OngController')
const IncidentController = require('./controller/IncidentController')
const ProfileController = require('./controller/ProfileController')
const SessionController = require('./controller/SessionController')

const routes = express.Router()

/**
 * query params = São as informações que ficam depois de '?' na rota (request.query)
 * route params = São usados apra identificar recursos, eg. users/:nome (request.params) 
 * request body = São usados para criar ou editar recursos (request.body)
 */

// Cria sessão com ong (login).
routes.post('/session', SessionController.create)

// Cria ongs na tabela ongs
routes.post('/ongs', OngController.create)
// Lista ongs.
routes.get('/ongs', OngController.index)

// Cria casos.
routes.post('/incidents', IncidentController.create)
// Lista casos.
routes.get('/incidents', IncidentController.index)
// Deleta um caso.
routes.delete('/incidents/:id', IncidentController.delete)

// Lista casos de uma ong especifica.
routes.get('/profile', ProfileController.index)

module.exports = routes