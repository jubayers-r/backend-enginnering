import fs from "fs";

console.log("Start reading");

try {
  const data = fs.readFileSync("./data/diary.txt", "utf-8"); //if not given utf-8, it will only provide buffer
  console.log("file content")
  console.log(data);
} catch (error) {
  console.log(error.message);
}

console.log("finished");
