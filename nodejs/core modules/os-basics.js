import os from "os";

console.log("System info \n");

console.log("-".repeat(50));

console.log("Platfrom: ", os.platform());
console.log("Architecture: ", os.arch());
console.log("OS Type: ", os.type());
console.log("OS Release: ", os.release());
console.log("Hostname: ", os.hostname);

console.log("\nCPU Info: ");
const cpus = os.cpus();

console.log("-".repeat(50));
console.log(cpus); //detailes of each core of processor/cpu
console.log("-".repeat(50));

console.log("CPU Model: ", cpus[0].model);
console.log("CPU Speed: ", cpus[0].speed);
console.log("Number of cores: ", cpus.length);

console.log("-".repeat(50));
const totalMem = (os.totalmem() / (1024 * 1024 * 1024)).toFixed(2);
const freeMem = (os.freemem() / (1024 * 1024 * 1024)).toFixed(2);
console.log("Total Memory: ", totalMem, "GB");
console.log("Free Memory: ", freeMem, "GB");
console.log("-".repeat(50));

const uptime = os.uptime();
const uptimeDays = Math.floor(uptime / 86400);
const uptimeHours = Math.floor(uptime % 86400) / 3600;
const uptimeMinutes = Math.floor(uptime % 3600) / 60;

console.log(uptime);
console.log(
  uptimeDays,
  "Days",
  uptimeHours.toFixed(2),
  "Hours",
  uptimeMinutes.toFixed(2),
  "Minutes"
);
