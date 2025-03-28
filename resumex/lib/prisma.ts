import { PrismaClient } from "@prisma/client";

// Documentation: Sets up a global PrismaClient for querying the database.
// New changes: None. This pattern avoids multiple Prisma instances in development.

const globalForPrisma = global as unknown as { prisma: PrismaClient };

let prisma: PrismaClient;
if (!globalForPrisma.prisma) {
  globalForPrisma.prisma = new PrismaClient({ log: ["query"] });
}
prisma = globalForPrisma.prisma;

export default prisma;
