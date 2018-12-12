import storage from './Storage';

function isLoggedIn() {
    return !!storage.get('token');
}

export {
    isLoggedIn
}