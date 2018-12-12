/**
 * console message
 * @param msg
 * @private
 */
function __debugMsg(msg) {
    console.log(msg);
}

/**
 * @param {string} msg 
 * @private
 */
function __errorMsg(msg) {
    console.error(msg);
}

/**
 * serialize json object into query string
 * @param json
 * @returns string
 */
function json2query(json) {
    let querys = [];
    for(let k in json) {
        querys.push(k + '=' + encodeURIComponent(json[k]));
    }
    return querys.join('&');
}

/**
 * 
 * @param {string} str 
 * @param {object} obj
 */
function format(str , obj) {
    if (typeof str != 'string') {
        __errorMsg('Expect `string` but ' + (typeof obj) + ' given.');
    }
    if (typeof obj != 'object') {
        __errorMsg('Expect `object` but ' + (typeof obj) + ' given.');
    }
    return str.replace(/\[:(.*?)\]/g , (m , p) => {
        return !!obj[p] ? obj[p] : '';
    });
}

/**
 * encode to base64 using unicode
 * @param {string} str 
 */
function base64Encode(str) {
    // first we use encodeURIComponent to get percent-encoded UTF-8,
    // then we convert the percent encodings into raw bytes which
    // can be fed into btoa.
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
        function toSolidBytes(match, p1) {
            return String.fromCharCode('0x' + p1);
    }));
}

export {
    format,
    base64Encode,
    json2query,
    __debugMsg
}