const { Router } = require('express');
const controller = require('./controller');
const router = Router();

router.get('/',controller.getUser)
router.post('/', controller.addUser)
router.put('/:id', controller.updateUser)
router.get('/:id', controller.getUserbyID)
router.delete('/:id', controller.removeUser);

router.post('/upload', controller.getO)
module.exports = router;