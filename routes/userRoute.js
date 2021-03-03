const userController = require('../controller/userController');
const userRoute = require('express').Router();
const authentication = require('../middleware/authentication')

userRoute.get('/', (req, res) => {
    res.status(200).json({
        msg: 'user Route Connected'
    })
});
userRoute.post('/login', userController.Login);
userRoute.post('/register', userController.Register);
userRoute.post('/', authentication, userController.getUser);
userRoute.put('/update/:id', authentication, userController.updateUser );
userRoute.delete('/delete/:id',authentication, userController.deleteUser);

module.exports = userRoute;