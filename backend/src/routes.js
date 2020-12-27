const express = require('express');
const IncidentController = require('./Controllers/IncidentController');
const OngController = require('./Controllers/OngController');
const ProfileController = require('./Controllers/ProfileController');
const SessionController = require('./Controllers/SessionController');
const {celebrate, Segments, Joi} = require('celebrate');


const routes = express.Router();

//login
routes.post('/session', SessionController.create);

//ongs
routes.get('/ongs', OngController.index);
routes.post('/ongs', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    whatsapp: Joi.string().required().min(10).max(11),
    city: Joi.string().required(),
    uf: Joi.string().required().length(2),
  })
}), OngController.create);

//profiles
routes.get('/profile', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorizathion: Joi.string().required(),
  }).unknown(),
}),ProfileController.index);

//incidents
routes.get('/incidents', celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number(),
  })
}),IncidentController.index);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required(),
  })
}),IncidentController.delete);

module.exports = routes;