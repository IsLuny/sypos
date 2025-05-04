import { WorkspaceFeaturesFlags } from '@sypos/api-types'
import { bitfields } from '@sypos/utilities'

export class WorkspaceFeatures extends bitfields.Bitfield<WorkspaceFeaturesFlags> {
	static Flags = WorkspaceFeaturesFlags

	static defaultBits = WorkspaceFeatures.resolve<WorkspaceFeaturesFlags>(
        
	)
}