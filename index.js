/**
 * Nested Error
 */
class NError extends Error {
    /**
     * Create error object
     * @param {Error} [parent]
     * @param {object} [info]
     * @param {string} message
     * @param {string} [fileName]
     * @param {number} [lineNumber]
     */
    constructor(...args) {
        let parent, info;
        if (args.length) {
            if (args[0] instanceof Error)
                parent = args.shift();
            if (args.length) {
                if (typeof args[0] === 'object' && args[0] !== null)
                    info = args.shift();
            }
        }

        super(...args);
        this.name = 'NError';

        this._parent = parent;
        this._info = info;
    }

    /**
     * Parent setter
     * @param {Error} parent
     */
    set parent(parent) {
        return this._parent = parent;
    }

    /**
     * Parent getter
     * @type {Error}
     */
    get parent() {
        return this._parent;
    }

    /**
     * Info setter
     * @param {object} info
     */
    set info(info) {
        return this._info = info;
    }

    /**
     * Info getter
     * @type {object}
     */
    get info() {
        let loadInfo = error => {
            let info = error.parent ? loadInfo(error.parent) : {};
            if (this._info)
                Object.assign(info, this._info);
            return info;
        };

        return loadInfo(this);
    }

    /**
     * Combined messages getter
     * @type {string}
     */
    get messages() {
        let result = this.message;
        for (let parent = this.parent; parent; parent = parent.parent)
            result += `: ${parent.message}`
        return result;
    }

    /**
     * Convert this instance of an array of Errors in reverse order
     * @return {Array}
     */
    toArray() {
        let result = [ this ];
        for (let parent = this.parent; parent; parent = parent.parent)
            result.push(parent);
        return result;
    }
}

module.exports = NError;