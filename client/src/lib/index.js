import { API } from './config';
import { fetchAPI, format, base64Encode } from './util'
import { Storage } from './Storage'

const storage = new Storage();

export {
    API,
    fetchAPI,
    format,
    base64Encode,
    storage
}