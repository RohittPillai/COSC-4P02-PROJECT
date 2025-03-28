import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

let prisma: PrismaClient;
if (!globalForPrisma.prisma) {
  globalForPrisma.prisma = new PrismaClient({ log: ["query"] });
}
prisma = globalForPrisma.prisma;

export default prisma;
