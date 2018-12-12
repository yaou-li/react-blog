import { DEFAULT_DURATION } from './config';
/**
 * Storage class is used for controlling & updating the local params.
 */

const LABEL = 'yaous-blog'

export class Storage {
    constructor() {
        this.params = {};
    }

    /**
     * force the replace the old with current params
     */
    force() {
        window.localStorage.removeItem(LABEL);
        window.localStorage.setItem(LABEL, JSON.stringify(this.params));
        return this;
    }

    /**
     * pull and merge the current params with data in storage.
     * use params' data if key both appears in params and storage
     */
    sync() {
        let params = JSON.parse(window.localStorage.getItem(LABEL));
        for (let name in params) {
            if (this.params.hasOwnProperty(name)) continue;
            this.params[name] = params[name];
        }
        return this.force();
    }

    /**
     * get param by name
     * remove param if expired
     * @param {string} name 
     */
    get(name) {
        this.sync();
        if (!this.params.hasOwnProperty(name)) return '';
        if (this.isExpired(name)) {
            delete this.params[name];
            this.force();
            return '';
        }
        return this.params[name].data;
    }

    /**
     * save the new params with key, val and duration
     * @param {string} name 
     * @param {mix} val 
     * @param {int} duration 
     */
    set(name,val,duration) {
        this.sync();
        this.params[name] = {
            data: val,
            timestamp: +new Date(),
            duration: duration ? duration * 1000 : DEFAULT_DURATION
        }
        return this.force();
    }

    /**
     * @param {string} name 
     */
    del(name) {
        this.sync();
        if (this.params.hasOwnProperty(name)) delete this.params[name];
        return this.force();
    }

    /**
     * clear params object and storage
     */
    clear() {
        this.params = {};
        window.localStorage.removeItem(LABEL);        
    }

    /**
     * check if param is expired
     * @param {string} name 
     */
    isExpired(name){
        let now = +new Date();
        if (!this.params.hasOwnProperty(name)) return false;
        return this.params[name].timestamp + this.params[name].duration <= now;
    }

}

const storage = new Storage();
export default storage;