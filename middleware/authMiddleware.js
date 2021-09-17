const jwt = require('jsonwebtoken');
const User = require('../model/user');

//check if JWT exists 
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
        res.redirect('/login')
    }
}

//check current user
const checkUser =  (req, res, next)=>{
    const token =req.cookies.jwt;
    if(token){
        jwt.verify(token, 'login sceret', async (err, decodedToken)=>{
            if (err){
                console.log(err.message)
                res.locals.user = null;
                next()
            }else{
                 let user = await User.findById(decodedToken.id)
                 res.locals.user = user;
                 next();
            }
        })
    }
    else{
        res.locals.user = null;
        next()
    }
}


module.exports = {requireAuth, checkUser}