import { createEnum } from '@sypos/utilities'

import { $Enums } from '../../../prisma/client'

export const Status = createEnum([
	'ACTIVE',
	'DELETED',
	'INACTIVE',
] as $Enums.Status[])
export type Status = keyof typeof Status