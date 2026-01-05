import app from "./app";
import prisma from "./lib/prisma";

const PORT = process.env.PORT || 3000;

async function main() {
  try {
    await prisma.$connect();
    app.listen(PORT, () => {
      console.log("server is connected on port", PORT);
    });
  } catch (error) {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

main();
