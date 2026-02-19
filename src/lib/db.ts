import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

function getDb(): PrismaClient {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = new PrismaClient({
      log: ['query'],
    })
  }
  return globalForPrisma.prisma
}

export const db = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL não configurada')
    }
    return (getDb() as unknown as Record<string | symbol, unknown>)[prop]
  },
})
