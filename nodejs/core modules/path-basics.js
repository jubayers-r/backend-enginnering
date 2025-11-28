import path, { dirname } from "path";
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url); //with commonjs we wouldnt have to delacare these
const __dirname = dirname(__filename); //with commonjs we wouldnt have to delacare these

console.log("Current file info: \n");
console.log("filename: ", __filename);
console.log("directory: ", __dirname);

console.log("\n" + "-".repeat(50) + "\n");

const filePath = "/jubayer/docs/resume.pdf";

console.log("analyze :", filePath);
console.log("Directory: ", path.dirname(filePath));
console.log("Basename: ", path.basename(filePath));
console.log("File Extension: ", path.extname(filePath));
console.log("File Name: ", path.basename(filePath, path.extname(filePath)));

const parsedPath = path.parse(filePath);

console.log(parsedPath);
console.log("\n" + "-".repeat(50) + "\n");
console.log("formatted path", path.format(parsedPath));

