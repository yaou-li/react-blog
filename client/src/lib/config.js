const HOST = 'http://127.0.0.1/api';
const API = {
    DEMO: HOST + '/demo/[:demoId]',
    LOGIN: HOST + '/login',
    TOKEN: HOST + '/token/refresh'
}
const DEFAULT_DURATION = 10 * 60 * 1000

export {
    API,
    DEFAULT_DURATION
}