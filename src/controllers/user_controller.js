import User from '../models/user_model.js';
import jwt from 'jsonwebtoken';

export const getUser = async (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {

        const decoded = jwt.verify(token, process.env.TOKEN_JWT);
        const userId = decoded.id;

        const user = await User.findOne({ userId }).select('username email');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Error al obtener el usuario:', error);
        res.status(500).json({ message: 'Error al obtener el usuario' });
    }
};


export const deleteUser = async (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        
        const decoded = jwt.verify(token, process.env.TOKEN_JWT);
        const userId = decoded.id;

        console.log(userId)

    
        const deletedUser = await User.findOneAndDelete({userId})

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error al eliminar el usuario:', error);
        res.status(500).json({ message: 'Error al eliminar el usuario' });
    }
};
