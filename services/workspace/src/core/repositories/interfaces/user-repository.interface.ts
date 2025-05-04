import { User } from '@/domain/workspace/user/user.model'

export interface UserRepository {
    findById(id: string): Promise<User | null>
    findByEmail(signInKey: string): Promise<User | null>
}