const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next)=>{
    const token = req.cookies.jwt

    if (token) {
        jwt.verify(token, 'login sceret', (err, decodedToken)=>{
            if(err){
                res.redirect('/')
                console.log(err.message)
            }
            else{
                console.log(decodedToken)
                next()
            }
        })
    }
    else{
        res.redirect('/')
    }
}

module.exports = {requireAuth}