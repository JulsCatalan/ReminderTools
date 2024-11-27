import jwt from 'jsonwebtoken';

const createJWT = (payload) => {
    try {
        // Generar el token
        const token = jwt.sign(
            payload, // El payload a incluir en el token
            process.env.TOKEN_JWT, // La clave secreta
            {
                expiresIn: "1h" // Duración del token
            }
        );

        return token; // Devuelve el token generado
    } catch (error) {
        console.error("Error al crear el JWT:", error);
        throw new Error("No se pudo generar el token");
    }
};


export default createJWT;