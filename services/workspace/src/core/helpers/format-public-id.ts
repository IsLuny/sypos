const az = [ ...'abcdefghijklmnopqrstuvwxyz' ]

const x = 100000

export type IdType = 'PRODUCT' | 'USER' | 'WORKSPACE' | 'SALE' | 'ORDER'

const typePrefixs: Record<IdType, string> = {
	USER: 'U',
	ORDER: 'O',
	PRODUCT: 'P',
	SALE: 'S',
	WORKSPACE: 'W',
}

export function formatPublicId<IdT extends IdType>(type: IdT, publicId: number) {
	let outputId = `${typePrefixs[type]}-`
             
	const a = (publicId + 1) % (x * 10)
	outputId += az[Math.floor((publicId + 1) / (x * 10))].toUpperCase() + '0'.repeat(x.toString().length - a.toString().length) + a

	return outputId
}