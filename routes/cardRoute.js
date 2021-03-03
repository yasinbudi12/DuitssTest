const cardController = require('../controller/cardController');
const cardRouter = require('express').Router();
const authentication = require('../middleware/authentication')


cardRouter.get('/test', (req, res) => {
    return res.status(200).json({
        msg: 'Card Router Connected'
    })
})
cardRouter.get('/', authentication, cardController.detailCard);
cardRouter.post('/', authentication, cardController.addCard);
cardRouter.put('/update/:id', authentication, cardController.updateCard);
cardRouter.delete('/delete/:id', authentication, cardController.deleteCard);

module.exports = cardRouter;