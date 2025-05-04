import { UserFeaturesFlags } from '@sypos/api-types'
import { bitfields } from '@sypos/utilities'

export class UserFeatures extends bitfields.Bitfield<UserFeaturesFlags> {
	static Flags = UserFeaturesFlags

	static defaultBits = UserFeatures.resolve<UserFeaturesFlags>(
		
	)
}