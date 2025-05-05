import { createEnum } from '@sypos/utilities'

export const Status = createEnum([
	'ACTIVE',
	'DELETED',
	'INACTIVE',
])
export type Status = keyof typeof Status