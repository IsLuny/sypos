import { prisma } from '@/core/database'
import { WorkspaceDTO } from '@/core/dtos/workspace.dto'

import { WorkspaceRepository } from '../interfaces/workspace-repository.interface'

export class PrismaWorkspaceRepository implements WorkspaceRepository {
	async findById(id: string): Promise<WorkspaceDTO | null> {
		return await prisma.workspace.findUnique({
			where: {
				id,
			},
		}) ?? null
	}

	async updateById(id: string, data: Partial<SuperOmit<WorkspaceDTO, 'id' | 'public_id'>>): Promise<WorkspaceDTO> {
		return await prisma.workspace.update({
			where: {
				id,
			},
			data,
		}) ?? null
	}
}