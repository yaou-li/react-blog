const LABEL = 'yaous-blog'
const DEFAULT_DURATION = 10 * 60 * 1000
export class Storage {
    constructor() {
        this.params = {};
    }

    force() {
        window.localStorage.removeItem(LABEL);
        window.localStorage.setItem(LABEL, JSON.stringify(this.params));
        return this;
    }

    sync() {
        let params = JSON.parse(window.localStorage.getItem(LABEL));
        for (let name in params) {
            if (this.params.hasOwnProperty(name)) continue;
            this.params[name] = params[name];
        }
        return this.force();
    }

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

    set(name,val,duration) {
        this.sync();
        this.params[name] = {
            data: val,
            timestamp: +new Date(),
            duration: duration ? duration * 1000 : DEFAULT_DURATION
        }
        return this.force();
    }

    del(name) {
        this.sync();
        if (this.params.hasOwnProperty(name)) delete this.params[name];
        return this.force();
    }

    clear() {
        this.params = {};
        window.localStorage.removeItem(LABEL);        
    }

    isExpired(name){
        let now = +new Date();
        if (!this.params.hasOwnProperty(name)) return false;
        return this.params[name].timestamp + this.params[name].duration <= now;
    }

}