type UnicBit<Flags extends FlagsRecord = FlagsRecord> = bigint | Keys<Flags> | Bitfield<Flags>

type Bit<Flags extends FlagsRecord = FlagsRecord> = UnicBit<Flags> | Array<UnicBit<Flags>>

type FlagsRecord = { [key: string]: bigint }

type Keys<Flags extends FlagsRecord> = Extract<keyof Flags, string>

export class Bitfield<Flags extends FlagsRecord = FlagsRecord> {
	public bits: bigint

	public Flags = {} as { [key in Keys<Flags>]: bigint }

	public resolve: (...bit: Bit<Flags>[]) => bigint = Bitfield['resolve']
	public Object: typeof Bitfield = Bitfield<Flags>

	public constructor(...bits: Bit<Flags>[]) {
		const object = (this.constructor as typeof Bitfield)
		const resolve: (...bit: Bit<Flags>[]) => bigint = object._resolve.bind(this.constructor)

		this.bits = resolve(bits.length ? bits as Bit<Flags> : object.defaulBits)

		Object.defineProperty(this, 'resolve', {
			value: resolve,
			enumerable: false,
		})

		Object.defineProperty(this, 'Object', {
			value: object,
			enumerable: false,
		})

		Object.defineProperty(this, 'Flags', {
			value: object.Flags,
			enumerable: false,
		})
	}

	has(bit: Bit<Flags>) {
		bit = this.resolve(bit)
		return (this.bits & bit) === bit
	}

	missing(bits: Bit<Flags>): Array<Keys<Flags>> {
		return new this.Object(bits).remove(this).toArray() as Array<Keys<Flags>>
	}

	add(...bits: Array<Bit<Flags>>) {
		let total = this.Object.defaulBits
		for(const bit of bits) {
			total |= this.resolve(bit)
		}

		if(Object.isFrozen(this)) return new this.Object(this.bits | total)
		this.bits |= total
		return this
	}

	remove(...bits: Array<Bit<Flags>>) {
		let total = Bitfield.defaulBits
		for(const bit of bits) {
			total |= this.resolve(bit)
		}
		if(Object.isFrozen(this)) return new this.Object(this.bits & ~total)
		this.bits &= ~total
		return this
	}

	serialize() {
		const serialized = {} as Record<Keys<Flags>, boolean>

		for(const [flag, bit] of Object.entries(this.Object.Flags as Flags) as Array<[Keys<Flags>, bigint]>) {
			serialized[flag] = this.has(bit)
		}

		return serialized
	}

	toArray(): Array<Keys<Flags>> {
		return Object.keys(this.Object.Flags).filter(bit => this.has(bit as any)) as Array<Keys<Flags>>
	}

	toJSON() {
		return Number(this.bits)
	}

	*[Symbol.iterator]() {
		yield* this.toArray()
	}

	public static get ALL() {
		const { Flags } = this

		return Object.values(Flags as FlagsRecord).reduce((all, p) => all | p, 0n)
	}

	static resolve<Flags extends FlagsRecord = FlagsRecord>(..._bit: Bit<Flags>[]): bigint {
		return this._resolve<Flags>(_bit.flat(Infinity) as Bit<Flags>)
	}

	private static _resolve<Flags extends FlagsRecord = FlagsRecord>(bit: Bit<Flags>): bigint {
		const { Flags } = this
		
		if(typeof bit === 'bigint') return bit
		if(bit instanceof Bitfield) return bit.bits
		if(Array.isArray(bit)) return bit.map(p => this._resolve(p)).reduce((prev, p) => prev | p, 0n)
		if(typeof bit === 'string' && typeof Flags[bit] !== 'undefined') return Flags[bit]
		throw new Error('BitField Invalid: ' + bit)
	}

	public static Flags: FlagsRecord = {}

	public static defaulBits: bigint = 0n
}