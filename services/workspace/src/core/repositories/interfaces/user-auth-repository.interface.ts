import { UserAuthDTO } from '@/core/dtos/user-auth.dto'

export interface AuthRepository {
    findByUserId(userId: string): Promise<UserAuthDTO | null>
    findBySignInKey(signInKey: string): Promise<UserAuthDTO | null>
    
    updateByUserId(userId: string, data: Partial<SuperOmit<UserAuthDTO, 'userId'>>): Promise<UserAuthDTO>
}