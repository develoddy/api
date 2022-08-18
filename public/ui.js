import {saveUser} from './socket.js';

export const onHandlesubmit = (e) => {
    e.preventDefault();

    saveUser(
        userForm['name'].value, 
        userForm['lastname'].value, 
        userForm['username'].value,
        userForm['email'].value,
        userForm['password'].value,
        userForm['code'].value,
        userForm['is_active'].value,
        userForm['is_admin'].value,
        userForm['created_at'].value,
        userForm['updated_at'].value,
    )
}