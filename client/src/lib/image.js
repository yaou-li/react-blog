import fetchAPI  from './fetchAPI';
import { __errorMsg } from './util'; 
import { API } from './config';

export function saveImage(file, cb) {
    if (!(file instanceof File)) {
        __errorMsg('Input is not valid File list.');
        return false;
    }
    fetchAPI({
        url: API.IMAGE,
        method: 'POST',
        params: {
            image: file,
        },
        success: cb
    });
}