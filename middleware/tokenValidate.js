const jwt = require("jsonwebtoken");
const User = require("../models\/userModel");

const tokenValidate = (req, res, next) => {
    const token = req.headers.authorization || req.headers.Authorization;
    if(!token){
        res.status(401);
        throw new Error("Unauthorized token is missing");
    }
    const accessToken = token.split(" ")[1]
    const verify = jwt.verify(accessToken, "MYSECRETID", (err, verifiedJwt) => {
        if (err) {
            res.status(401);
            throw new Error("Unauthorized");
        }
        else{
            req.user = verifiedJwt.user;
            next()
        }
    })
   
}
module.exports = tokenValidate;