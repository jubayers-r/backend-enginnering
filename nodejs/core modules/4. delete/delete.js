import fs from "fs";

// try {
//   fs.writeFileSync("./output/temp.txt", "this is temp file");
//   console.log("file created");
// } catch (error) {
//   console.log(error.message);
// }

if (fs.existsSync("./output/temp.txt")) {
  fs.unlinkSync("./output/temp.txt");
  console.log("file deleted successfully");
} else {
  console.error("file doesnt exist");
}
