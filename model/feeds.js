import Base from "./index.js";

export default class Feeds {
	static db = Base("feeds");

	static get(key) {
		return this.db.get(key);
	}

	static add(key, data) {
		return this.db.put(data, key, { expireIn: 3600 });
	}
}
