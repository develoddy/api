// Formas de interactuar con el backend
// Guardas, datos, borrar, etc

const socket = io();
export const loadUser = () => {
    socket.on('loadUsers', (data) => {
        console.log(data);
    });
};

export const saveUser = (name, lastname, username, email, password, code, is_active, is_admin, created_at, updated_at) => {
    socket.emit('newuser', {
        name,
        lastname,
        username,
        email,
        password,
        code,
        is_active,
        is_admin,
        created_at,
        updated_at

    });
};