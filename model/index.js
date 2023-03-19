import { Deta } from "deta";

// const deta = Deta("a057dzwLiMAZ_9hHwQ51Ko8YnB97Anc68zj4iLXR79DWD");
const deta = Deta(process.env.BASE_KEY);

const Base = name => deta.Base(name);
export default Base;
