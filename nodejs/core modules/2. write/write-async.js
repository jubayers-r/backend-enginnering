import fs from "fs";

const content2 = "This is a content too \n asyc";

fs.writeFile("./write/output/test-write-async.txt", content2, (error) => {
  if (error) {
    console.error(error.message);
  } else {
    console.log("file written asyc");
  }
});
