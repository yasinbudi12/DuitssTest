const formidable = require("formidable");
const form = new formidable.IncomingForm();
form.multiples = true;

const formDataParser = async (req, res, next) => {
  try {
    const contentType = req.headers["content-type"];
    if (contentType && contentType.indexOf("multipart/form-data") !== -1) {
      form.parse(req, (err, fields, files) => {
        if (err) {
          throw new Error(err.toString());
        }
        req.body = fields;
        req.files = files;
        return next();
      });
    } else {
      return next();
    }
  } catch (error) {
    return res.status(400).json({
      msg: "Form Parse Failed",
      err: error.message,
    });
  }
};

module.exports = formDataParser;
