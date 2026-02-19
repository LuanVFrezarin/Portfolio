import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    const luan = await prisma.employee.upsert({
        where: { email: 'luan@frezarin.com' },
        update: {},
        create: {
            email: 'luan@frezarin.com',
            name: 'Luan Frezarin',
            pin: '123456',
        },
    })

    console.log({ luan })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
