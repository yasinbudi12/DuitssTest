const router = require("express").Router();
const port = process.env.PORT;
const cardRouter = require("./cardRoute");
const historyRouter = require('./historyRoute')
const userRouter = require('./userRoute')
router.get("/", (req, res) => {
  res.status(200).json({
    msg: "Home Domain Conected",
    connectOn: port,
  });
});
router.use('/user', userRouter)
router.use('/card', cardRouter)
router.use('/history', historyRouter)

module.exports = router;
