import { UserDTO } from '@/core/dtos/user.dto'
import { Status } from '@/core/enums/status'

export class User implements SuperOmit<UserDTO, 'features'> {
	createdAt: Date
	email: string
	name: string
	id: string
	publicId: number
	role: string
	status: Status
	workspaceId: string

	constructor(data: UserDTO) {
		Object.assign(
			this,
			{
				...data,
				features: {},
			}
		)
	}
}