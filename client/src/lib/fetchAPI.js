import storage from './Storage';
import { __debugMsg, json2query } from './util';

/**
 * fetchAPI wrapped fetch-api
 * can't have progress bar
 * @param args {object}
 */
export default function fetchAPI(args) {
    let url = args.url || '';
    let method = args.method || 'GET';
    let params = args.params || {};
    let form = args.form || {};
    let success = (typeof args.success === 'function') ? args.success : () => {};
    let error = (typeof args.error === 'function') ? args.error : () => {};
    let complete = (typeof args.complete === 'function') ? args.complete : () => {};
    let token = args.token || storage.get('token');

    let options = {
        method: method,
        headers: args.headers || new Headers(),
        credentials: 'include'
    };

    //append token if given
    if (token) {
        options.headers.set('Authorization', 'Token ' + token);
    }

    if (method.toLowerCase() === 'get') {
        url = url.replace(/#.*$/,'');
        if (Object.keys(params).length > 0) {
            url += (url.indexOf('?') > -1 ? '&' : '?') + json2query(params);
        }
    } else {
        let form = new FormData(form);
        for (let k in params) {
            if (params[k] instanceof window.FileList) {
                for (let i in params[k]) {
                    form.append(k,params[k][i]);
                }
            } else {
                form.append(k,params[k]);
            }
        }
        options.body = form;
    }

    __debugMsg("Sending " + method + " request to: " + url);

    return fetch(url, options).then(function(response) {
        __debugMsg("Response status: " + response.status);
        return response.json().then(function(result) {
            switch (result.code) {
                case 0:
                    __debugMsg("Request Success! Data:",result.data);
                    success(result.data, result.page);
                    break;
                default:
                    __debugMsg("Executing Error Callback:",result.data);
                    error(result.data);
                    break;
            }
            complete();
        });
    })
    .catch(function (res) {
        error(res);
        complete();
        __debugMsg('很抱歉，系统响应超时');
    });

    return true;
}