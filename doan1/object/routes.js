const { Router } = require('express');
const controller = require('./controller');
const router = Router();

router.get('/',controller.getObject)
router.post('/', controller.addObject)
router.put('/:id', controller.updateObject)
router.get('/:id', controller.getObjectbyID)
router.delete('/:id', controller.removeObject);

router.post('/upload', controller.getO)
module.exports = router;