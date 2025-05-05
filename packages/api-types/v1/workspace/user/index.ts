import { Status } from '../../enums/status'

export * from './user-features'

export interface APIUser {
    created_at: string
    email: string
    name: string
    id: string
    public_id: string
    status: Status
    features: string

    workspace: {
        id: string
        role: string
        permissions: string
    }
}