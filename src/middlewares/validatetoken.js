import jwt from 'jsonwebtoken'

export const validateToken = (req, res, next) =>{
    
    const token = req.cookies.token;

    //console.log(token);

    if(!token){
        return res.status(401).json({message : "Sin token, acceso no autorizado"})
    }

    jwt.verify(token, process.env.TOKEN_JWT, (err, decode) =>{
        if(err){
            return res.status(403).json({message: "Token no valido"})
        }
    })

    next()
} 