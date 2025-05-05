import { UserDTO } from '@/core/dtos/user.dto'

export interface UserRepository {
    findById(id: string): Promise<UserDTO | null>
    findByEmail(signInKey: string): Promise<UserDTO | null>
}