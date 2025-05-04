import { WorkspaceDTO } from '@/core/dtos/workspace.dto'

export interface WorkspaceRepository {
    findById(id: string): Promise<WorkspaceDTO | null>

    updateById(id: string, data: Partial<SuperOmit<WorkspaceDTO, 'id' | 'public_id'>>): Promise<WorkspaceDTO>
}