// ESTE SOCKET SERA QUIEN DIRA AL SERVIDOR QUE HAGA ALGO
// COMUNICACIONES CLIENTE Y SERVIDOR
// ES UNA CONEXION BIDERICCIONAL
// EN UN SOCKET PUEDE ESCUCHAR ASU VEZ Y DEVOLVER EVENTO
import {loadUser} from './socket.js';
import {onHandlesubmit} from './ui.js';

loadUser();

const userForm = document.querySelector('#userForm');
userForm.addEventListener('submit', onHandlesubmit);