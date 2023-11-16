import { Especialidade, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const especialidades: Especialidade[] = [
    {
      id: 1,
      name: "clinico geral",
    },
    {
      id: 2,
      name: "ortopedista",
    },
    {
      id: 3,
      name: "pediatria",
    },
    {
      id: 4,
      name: "oftalmologista",
    },
    {
      id: 5,
      name: "dermatologista",
    },
  ];

  console.log("Inserindo dados de especialidades no banco de dados...");

  for (const especialidade of especialidades) {
    await prisma.especialidade.create({
      data: especialidade,
    });
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
