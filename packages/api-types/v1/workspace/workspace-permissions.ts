import { bit } from '@sypos/utilities/src/bitfields/default'

export const WorkspacePermissionsFlags = {
	'AccessPointOfService': bit(0),
	'CreateSell': bit(1),
	'ViewSellsHistory': bit(2),
	'CreateItems': bit(3),
	'ManageItems': bit(4),
	'UpdateOrders': bit(5),
}
export type WorkspacePermissionsFlags = typeof WorkspacePermissionsFlags