import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

prismaClient.$transaction(async () => {
  await prismaClient.user.upsert({
    where: {
      id: 5,
    },
    create: {
      name: "Users" + Date.now(),
      email: Date.now() + "@gmail.com",
      password: "password",
      invitedBy: 2,
    },
    update: {
      name: "Users" + Date.now(),
      email: Date.now() + "@gmail.com",
      password: "password",
      invitedBy: 2,
    },
  });

  const userOne = await prismaClient.user.findUniqueOrThrow({
    where: {
      id: 1,
    },
    include: {
      invitee: true,
    },
  });

  console.log(userOne);
});
