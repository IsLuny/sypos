import { UserDTO } from '@/core/dtos/user.dto'
import { WorkspaceDTO } from '@/core/dtos/workspace.dto'

import { $Enums } from '../../../prisma/client'
import { WorkspaceFeatures } from './workspace-features.model'

export class Workspace implements SuperOmit<WorkspaceDTO, 'features'> {
	description: string | null
	id: string
	name: string
	public_id: number
	status: $Enums.Status

	features: WorkspaceFeatures

	constructor(data: UserDTO) {
		Object.assign(
			this,
			{
				...data,
				features: new WorkspaceFeatures(),
			}
		)
	}
}