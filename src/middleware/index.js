const adminAuth = (req, res, next) => {
    const isUserAuthorized = false; //auth logic
    if(isUserAuthorized){
      next();
    }
    else{
      res.status(401).send("Unauthorized")
    }
}

module.exports = {
    adminAuth
}