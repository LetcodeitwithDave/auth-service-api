import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

const connectDb = async () => {
  try {
    await prisma.$connect();
    console.log("DB connected via prisma");
  } catch (error) {
    console.log("DB connection error", error);
    process.exit(1);
  }
};

const disconnectDb = async () => {
  await prisma.$disconnect();
  console.log("DB disconnected via prisma");
};

export { prisma, connectDb, disconnectDb };
