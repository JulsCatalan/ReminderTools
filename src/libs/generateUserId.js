import { v4 as uuidv4 } from 'uuid';

function normalizeName(name) {
    try {
        return name
            .trim() // Elimina espacios al principio y al final
            .toLowerCase() // Convierte todo el nombre a minúsculas
            .replace(/\s+/g, '_'); // Reemplaza todos los espacios por guiones bajos
    } catch (error) {
        console.error("Error al normalizar el nombre:", error);
        throw new Error("El formato del nombre no es válido");
    }
}

const generateUserId = (string) => {
    try {
        const normalizedUserName = normalizeName(string);
        const userId = `${normalizedUserName}_${uuidv4()}`;
        return userId;
    } catch (error) {
        console.error("Error al generar el UserID:", error);
        throw new Error("No se pudo generar el UserID");
    }
};

export default generateUserId;
