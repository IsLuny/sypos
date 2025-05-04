import { User } from '@/domain/workspace/user/user.model'
import { WorkspacePermissions } from '@/domain/workspace/workspace-permissions.model'

export async function calcPermissions(
	user: User,
	roles: []
) {
	if(user.role === 'WORKSPACE://OWNER') {
		return new WorkspacePermissions(WorkspacePermissions.ALL)
	}
	
	return new WorkspacePermissions(0n)
}