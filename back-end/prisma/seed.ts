import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const roles = await prisma.roles.createMany({
    data: [{ role: 'admin' }, { role: 'user' }],
  });

  const admin = await prisma.users.create({
    data: {
      name: 'admin',
      email: 'admin@admin.com',
      password: 'admin',
      role: {
        connect: {
          role: 'admin',
        },
      },
    },
  });

  console.log({ roles, admin });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });