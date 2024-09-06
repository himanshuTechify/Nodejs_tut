var express = require('express')

const router = express.Router();
const {getAllUser, getUser, addUser, updateUser,deleteUser} = require('../contollers/user')

router
    .get('/', getAllUser)
    .get('/:id', getUser)
    .post('/', addUser)
    .patch('/:id', updateUser)
    .delete('/:id', deleteUser)


module.exports = router;