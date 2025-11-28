import crypto from "crypto";

const md5Hash = crypto.createHash("md5").update("password123").digest("hex");
const sha256Hash = crypto.createHash("sha256").update("password123").digest("hex");
const sha512Hash = crypto.createHash("sha512").update("password123").digest("hex");
console.log("Input: password123");
console.log("MD5 HashedPassword: ", md5Hash);
console.log("sha256 HashedPassword: ", sha256Hash);
console.log("sha512 HashedPassword: ", sha512Hash);
