import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');
  
  console.log('Cleaning existing data...');
  // Borramos datos anteriores para evitar duplicados si lo corres varias veces
  await prisma.user.deleteMany();
  console.log('Users deleted');
  await prisma.tenant.deleteMany();
  console.log('Tenants deleted');

  console.log('⏳ Creating tenants...');
  // Insertamos los datos de prueba idénticos a los de la guía
  await prisma.tenant.createMany({
    data: [
      { name: 'Tech Solutions' },
      { name: 'Marketing Pro' },
      { name: 'Consulting Exp' },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });