class historyController {
  static getHistory(req, res) {
    try {
      return res.status(200).json({
        msg: "Get History Success",
      });
    } catch (error) {
      return res.status(400).json({
        msg: "Get History Failed",
        error: error.message,
      });
    }
  }
  static addHistory(req, res) {
    try {
        return res.status(200).json({
          msg: "Add History Success",
        });
      } catch (error) {
        return res.status(400).json({
          msg: "Add History Failed",
          error: error.message,
        });
      }
  }
  static updateHistory(req, res) {
    try {
        return res.status(200).json({
          msg: "Update History Success",
        });
      } catch (error) {
        return res.status(400).json({
          msg: "Update History Failed",
          error: error.message,
        });
      }
  }
  static deleteHistory(req, res) {
    try {
        return res.status(200).json({
          msg: "Delete History Success",
        });
      } catch (error) {
        return res.status(400).json({
          msg: "Delete History Failed",
          error: error.message,
        });
      }
  }
}
module.exports = historyController;
