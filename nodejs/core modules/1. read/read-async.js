import fs from "fs";

console.log("start reading");

fs.readFile("./data/diary.txt", "utf-8", (error, data) => {
  if (error) {
    console.log("error happned: ", error.message);
  }

  console.log("File content :");
  console.log(data);
});

console.log("This runs immidiately - no blocking");
