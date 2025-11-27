const args = process.argv;
//process.arg[0] = node path
//process.arg[1] = file path
//process.arg[2] = returns given argument

const nodePath = args[0];
const filePath = args[1];
const name = args[2] || "guest";
const time = new Date().getHours();

let greetings;

if (time < 12) {
  greetings = "Good Morning";
} else if (time < 18) {
  greetings = "Good Afternoon";
} else {
  greetings = "Good Evening";
}

console.log(
  `${greetings} ${name}, You are using on a ${process.platform} machine using Node ${process.version} at NodePath ${nodePath} and FilePath ${filePath}`
);
