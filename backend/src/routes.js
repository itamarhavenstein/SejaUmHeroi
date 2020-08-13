const express = require('express');
const IncidentController = require('./Controllers/IncidentController');
const OngController = require('./Controllers/OngController');
const ProfileController = require('./Controllers/ProfileController');
const SessionController = require('./Controllers/SessionController');


const routes = express.Router();

//login
routes.post('/session', SessionController.create);

//ongs
routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

//profiles
routes.get('/profile', ProfileController.index);

//incidents
routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', IncidentController.delete);

module.exports = routes;