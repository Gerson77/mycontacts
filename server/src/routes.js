const { Router } = require('express');
const ContactController = require('./app/controllers/ContactController');
const CategoryController = require('./app/controllers/CategoryController');

const router = Router();

const meuMiddleware = (request, response, next) => {
  request.appId = 'MeuAppID';
  next();
};

router.get('/contacts', meuMiddleware, ContactController.index);
router.get('/contacts/:id', ContactController.show);
router.delete('/contacts/:id', ContactController.delete);
router.post('/contacts', ContactController.store);
router.put('/contacts/:id', ContactController.update);

router.get('/categories', CategoryController.index);
router.post('/categories', CategoryController.store);

module.exports = router;
