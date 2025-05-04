import { Bitfield as BitfieldClass } from './class'

export const create= <Flags extends string, FlagsCopy extends Flags = Flags>(flags: { [key in Flags]: bigint }, defaultBits?: bigint | Array<FlagsCopy>)  => {
	class Bitfield extends BitfieldClass<typeof Bitfield['Flags']> {
		static Flags: Record<Flags, bigint> = flags
		static defaultBit = BitfieldClass.resolve(defaultBits ?? 0n)
	}

	return Bitfield
}

export const bit = (flag: number | bigint) => {
	flag = typeof flag === 'bigint' ? flag : BigInt(flag)

	return 1n << flag
}

export type infer<BitfieldClass extends { Flags: {[key: string]: bigint } }> = {
    Flags: { [key in keyof BitfieldClass['Flags'] ]: bigint }
}

export { BitfieldClass as Bitfield }