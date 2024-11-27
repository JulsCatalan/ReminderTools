import User from '../models/user_model.js';
import bcrypt from 'bcrypt';
import createJWT from '../libs/jwt.js';
import generateUserId from '../libs/generateUserId.js';
import jwt from 'jsonwebtoken';

// PRODUCTION_ENV=development, secure = false,

// PRODUCTION_ENV=production, secure = true,

const isProduction = process.env.PRODUCTION_ENV === 'production'; 

export const register = async (req, res) => {
    const { username, email, password } = req.body;

    console.log(req.body);

    const userFound = await User.findOne({ email });

    if (userFound) {
        return res.status(400).json({ message: "This email is already registered" });
    }

    try {
        const userId = generateUserId(username);

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            userId,
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();

        const token = await createJWT({ id: userId });

        res.cookie('token', token, {
            httpOnly: true,         // Mejora la seguridad al deshabilitar el acceso desde JavaScript
            secure: isProduction,  // `true` en producción, `false` en desarrollo
            sameSite: 'Lax',       // Permite compartir cookies entre frontend y backend
            path: '/',             // Asegura la disponibilidad en todas las rutas
        });

        res.status(200).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Error registering user" });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    console.log(req.body);

    try {
        const userFound = await User.findOne({ email });

        if (!userFound) {
            return res.status(400).json({ message: "User not registered" });
        }

        const passwordMatch = await bcrypt.compare(password, userFound.password);

        if (!passwordMatch) {
            return res.status(400).json({ message: "Incorrect password" });
        }

        const token = await createJWT({ id: userFound.userId });

        res.cookie('token', token, {
            httpOnly: true,       // Mejora la seguridad al deshabilitar el acceso desde JavaScript
            secure: isProduction, // `true` en producción, `false` en desarrollo
            sameSite: 'Lax',     // Permite compartir cookies entre frontend y backend
            path: '/',           // Asegura la disponibilidad en todas las rutas
        });

        return res.status(200).json({ message: "Login successful" });
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ message: "Error during login" });
    }
};

export const logout = (req, res) => {
    try {
        // Clear the token cookie
        res.clearCookie('token', {
            httpOnly: true, // Ensure the cookie is inaccessible to JavaScript on the client side
            secure: isProduction, // `true` in production
            sameSite: 'strict', // Prevent CSRF attacks
        });

        console.log('Logout successful');
        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        console.error('Error during logout:', error);
        res.status(500).json({ message: 'Error during logout' });
    }
};

export const verifyToken = async (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        // Decode the token
        const decoded = jwt.verify(token, process.env.TOKEN_JWT);
        const userId = decoded.id; 

        const user = await User.findOne({ userId });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'Token is valid', user });
        console.log("Token is valid");
    } catch (error) {
        console.error('Error verifying token:', error);
        res.status(401).json({ message: 'Invalid or expired token' });
    }
};
