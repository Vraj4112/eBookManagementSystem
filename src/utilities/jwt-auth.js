const jwt = require("jsonwebtoken");

let VerifyToken = (req, res, next) => {
  let auth = req.headers.authorization.split(" ")[1];
  if (auth) {
    let verify = jwt.verify(
      auth,
      process.env.JWT_SECRET_CODE,
      (err, decoded) => {
        if (err) {
          return next(new Error("Unauthorized_token"));
        }
        next();
      }
    );
  } else {
    return next(new Error("Unauthorized_token"));
  }
};

module.exports = {
  VerifyToken,
};
