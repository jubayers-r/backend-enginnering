import fs from "fs";

const content1 = "content1 \n Nodejs is awesome";

try {
  fs.writeFileSync("./write/output/test-write-sync.txt", content1); //wrote file in write folder
  fs.writeFileSync("./output/test-write-sync.txt", content1); //wrote file in main output folder

  // fs module takes the root as its own folder, not where the .js file is

  console.log("file written");
} catch (error) {
  console.log(error.message);
}


