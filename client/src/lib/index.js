import { API, HOST, DEFAULT_DURATION } from './config';
import fetchAPI from './fetchAPI';
import { format, base64Encode, formatTime } from './util';
import { isLoggedIn } from './auth';
import storage from './Storage';

export {
    API,
    HOST,
    DEFAULT_DURATION,
    fetchAPI,
    format,
    base64Encode,
    storage,
    isLoggedIn,
    formatTime
}