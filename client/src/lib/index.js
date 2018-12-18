import { API, DEFAULT_DURATION } from './config';
import fetchAPI from './fetchAPI';
import { format, base64Encode } from './util';
import { isLoggedIn } from './auth';
import storage from './Storage';

export {
    API,
    DEFAULT_DURATION,
    fetchAPI,
    format,
    base64Encode,
    storage,
    isLoggedIn
}