const HOST = 'http://127.0.0.1';
const API = {
    DEMO: HOST + '/api/demo/[:demoId]',
    LOGIN: HOST + '/api/login',
    TOKEN: HOST + '/api/token/refresh',
    ARTICLE: HOST + '/api/article',
    IMAGE: HOST + '/api/image'
}
const DEFAULT_DURATION = 12 * 60 * 1000;

export {
    API,
    HOST,
    DEFAULT_DURATION
}