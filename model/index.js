import { Deta } from "deta";

const deta = process.env.BASE_KEY ? Deta(process.env.BASE_KEY) : Deta();

const Base = name => deta.Base(name);
export default Base;
