/* eslint-disable no-var */
import type { PrismaClient } from '@/core/repositories/database/prisma'
import type { EnvType } from '@/env'
import { HttpServer } from '@/infra/http/server'
import type { Logger } from '@/logger'

export {}

declare global {
    var __env: EnvType
    var __logger: Logger
    var __prisma: PrismaClient
    var __app: HttpServer
}