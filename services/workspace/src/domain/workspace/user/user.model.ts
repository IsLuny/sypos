import { APIUser } from '@sypos/api-types'

import { UserDTO } from '@/core/dtos/user.dto'
import { Status } from '@/core/enums/status'
import { formatPublicId } from '@/core/helpers/format-public-id'

export class User implements UserDTO {
	createdAt: Date
	email: string
	name: string
	id: string
	publicId: number
	role: string
	status: Status
	workspaceId: string
	features: bigint

	workspace: {
		id: string
		role: string
		permissions?: bigint
	}

	constructor(data: UserDTO) {
		Object.assign(
			this,
			{
				...data,
				workspace: {
					id: data.workspaceId,
					role: data.role,
					permissions: 0n,
				},
			}
		)
	}

	toJSON(): APIUser {
		return {
			created_at: this.createdAt.toISOString(),
			email: this.email,
			id: this.id,
			name: this.name,
			public_id: formatPublicId('USER', this.publicId),
			status: this.status,
			features: this.features.toString(),
			workspace: {
				id: this.workspace.id,
				role: this.role,
				permissions: this.workspace.permissions?.toString() ?? '0',
			},
		}
	}
}