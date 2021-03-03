class cardController {
  static detailCard(req, res) {
    try {
        return res.status(200).json({
            msg: 'Get Detail Card Success'
        })
    } catch (error) {
      return res.status(400).json({
        msg: "Get Detail Card Failed",
        error: error.message,
      });
    }
  }
  static addCard(req, res) {
    try {
        return res.status(201).json({
            msg: 'Add Card Success'
        })
    } catch (error) {
      return res.status(400).json({
        msg: "Add Card Failed",
        error: error.message,
      });
    }
  }
  static updateCard(req, res) {
    try {
        return res.status(200).json({
            msg: 'Update Card Failed'
        })
    } catch (error) {
      return res.status(400).json({
        msg: "Update Card Failed",
        error: error.message,
      });
    }
  }
  static deleteCard(req, res) {
    try {
        return res.status(200).json({
            msg: "Delete Card Failed"
        })
    } catch (error) {
      return res.status(400).json({
        msg: "Delete Card Failed",
        error: error.message,
      });
    }
  }
}
module.exports = cardController;
