import Base from "./index.js";

export default class Pages {
    static db = Base("pages");

    static getAll() {
        return this.db.fetch();
    }

    static get(key) {
        return this.db.get(key);
    }

    static add(page) {
        return this.db.put(page);
    }
}
