//1 first import jwt
const JWT = require('jsonwebtoken')

// simply next() function ko hamlog middleware kahte hai.
// next will excute further code
// 2.
module.exports = async (req, res, next)=>{
   try {
     // first of all here we get token
     const token = req.headers['authorization'].split(" ")[1]
     // verify token
     JWT.verify(token, process.env.JWT_SECRET, (err, decode)=>{
         if(err){
             return res.status(200).send({
                 message:"Auth Fialed",
                 success:false
             })
         }
         else{
             req.body.userId = decode.id;
             next()
         }
         
     })
    
   } catch (error) {
    console.log(error);
    res.status(401).send({
        message:"Auth Fialed",
        success:false
    })
    
   }
    
}
