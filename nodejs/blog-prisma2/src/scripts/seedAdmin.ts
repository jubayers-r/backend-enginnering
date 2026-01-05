import prisma from "../lib/prisma";
import { UserRole } from "../middleware/authorization";

async function seedAdmin() {
  try {
    //admin creation data
    console.log("***** Process started");
    const adminData = {
      name: "Admin",
      email: "admin5@gmail.com",
      role: UserRole.ADMIN,
      password: "admin1234",
    };
    console.log("***** CHECKING IF MAIL EXISTS");
    //check if mail exists
    const isExist = await prisma.user.findMany({
      where: {
        email: adminData.email,
      },
    });
    if (isExist.length) {
      // console.log("***** MAIL EXISTS, INSERTION FAILED");
      throw new Error("User already exists");
    }
    console.log("***** MAIL DOESNT EXISTS");

    console.log("***** INSERTING ADMIN DATA (MIGHT TAKE TIME)");
    // add admin data
    const signUpAdmin = await fetch(
      "http://localhost:3000/api/auth/sign-up/email",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Origin: "http://localhost:3000",
        },
        body: JSON.stringify(adminData),
      }
    );
    console.log("***** UPDATING MAIL VERIFICATION TO TRUE");

    // update mail verification to true
    if (signUpAdmin.ok) {
      await prisma.user.update({
        where: {
          email: adminData.email,
        },
        data: {
          emailVerified: true,
        },
      });
      console.log("***** SUCCESS");
    }
  } catch (error) {
    console.error(error);
  }
}

seedAdmin();
