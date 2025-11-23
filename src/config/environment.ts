// Environment
import * as fs from "fs";
import path from "path";

const ENV = process.env.ENV || "dev";
const f = path.join(__dirname,`environment.${ENV}.json`);
console.log("Reading file:", f);

const raw = fs.readFileSync(f,"utf-8");
export const envConfig = JSON.parse(raw);
