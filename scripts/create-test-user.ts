import { hash } from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function createTestUser() {
  try {
    // Hash the password
    const passwordHash = await hash("testpassword123", 12);

    // Create the user
    const user = await prisma.user.create({
      data: {
        name: "Test User",
        email: "test@example.com",
        passwordHash,
      },
    });

    console.log("Created test user:", user);
  } catch (error) {
    console.error("Error creating test user:", error);
  } finally {
    await prisma.$disconnect();
  }
}

createTestUser(); 