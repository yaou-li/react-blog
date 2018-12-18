const HOST = 'http://127.0.0.1/api';
const API = {
    DEMO: HOST + '/demo/[:demoId]',
    LOGIN: HOST + '/login',
    TOKEN: HOST + '/token/refresh',
    ARTICLE: HOST + '/article'
}
const DEFAULT_DURATION = 12 * 60 * 1000;

export {
    API,
    DEFAULT_DURATION
}