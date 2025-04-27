/* eslint-disable no-var */
import type { EnvType } from '@/env'
import { PrismaClient } from '@/infra/database/prisma/prisma-client'
import type { Logger } from '@/logger'

export {}

declare global {
    var __env: EnvType
    var __logger: Logger
    var __prisma: PrismaClient
}