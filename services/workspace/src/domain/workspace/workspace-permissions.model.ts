import { WorkspacePermissionsFlags } from '@sypos/api-types'
import { bitfields } from '@sypos/utilities'

export class WorkspacePermissions extends bitfields.Bitfield<WorkspacePermissionsFlags> {
	static Flags = WorkspacePermissionsFlags

	static defaultBits = WorkspacePermissions.resolve<WorkspacePermissionsFlags>(
        
	)
}