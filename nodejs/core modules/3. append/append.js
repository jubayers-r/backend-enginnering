import fs from "fs";

// fs.writeFile(
//   "./output/app.log",
//   `Application started at ${new Date().toISOString()}`,
//   (error) => {
//     if (error) {
//       console.log(error);
//     } else {
//       console.log("file created");
//     }
//   }
// );

const content = `\n user logged in ${new Date().toISOString()}`;

fs.appendFile("./output/app.log", content, (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("file appended successfully");
  }
});
