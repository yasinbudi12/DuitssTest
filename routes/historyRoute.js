const router = require('.');
const historyController = require('../controller/historyController');
const historyRouter = require('express').Router()
const authentication = require('../middleware/authentication')


historyRouter.get('/test', (req, res) => {
    return res.status(200).json({
        msg: 'History Route Connected'
    })
})
historyRouter.get('/', authentication, historyController.getHistory);
historyRouter.post('/', authentication, historyController.addHistory);
historyRouter.put('/update/:id', authentication, historyController.updateHistory);
historyRouter.delete('/delete/:id',authentication, historyController.deleteHistory);

module.exports = historyRouter;