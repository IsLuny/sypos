import { User } from '@/core/domain/workspace/user/user.model'

export interface UserRepository {
    findUserById(id: string): Promise<User>
}