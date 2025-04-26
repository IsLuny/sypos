import type { EnvType } from '../env'

export {}

declare global {
    let prisma: EnvType

    const _G: {
        env: EnvType
    }
}