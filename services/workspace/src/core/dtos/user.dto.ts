export interface UserDTO {
    name: string
    id: string
    public_id: number
    created_at: Date
    workspace_id: string
    email: string
    role: string
    features: bigint
}