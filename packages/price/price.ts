import type { Currency } from '@sypos/api-types'
import {
	add,
	decimal,
	divide,
	integer,
	multiply,
	sub,
	toFixedNumber,
	toNumber,
} from '@sypos/decimal.js'

export class Price {
	private _value: decimal
	private _currency: Currency

	constructor(value: decimal.Value, currency: Currency = 'BRL') {
		this._value = new decimal(value)
		this._currency = currency
	}

	static fromCents(cents: integer, currency: Currency = 'BRL'): Price {
		return new Price(divide(cents, 100), currency)
	}

	static fromString(value: string, currency: Currency = 'BRL'): Price {
		return new Price(new decimal(value), currency)
	}

	get value(): decimal {
		return this._value
	}

	get cents(): integer {
		return toNumber(multiply(this._value, 100)) as integer
	}

	get currency(): Currency {
		return this._currency
	}

	add(other: Price): Price {
		if(this._currency !== other._currency) {
			throw new Error('Cannot add prices with different currencies')
		}
		return new Price(add(this._value, other._value), this._currency)
	}

	subtract(other: Price): Price {
		if(this._currency !== other._currency) {
			throw new Error('Cannot subtract prices with different currencies')
		}
		return new Price(sub(this._value, other._value), this._currency)
	}

	multiply(factor: decimal.Value): Price {
		return new Price(multiply(this._value, factor), this._currency)
	}

	divide(divisor: decimal.Value): Price {
		return new Price(divide(this._value, divisor), this._currency)
	}

	max(other: Price): Price {
		return new Price(Math.max(this._value.toNumber(), other._value.toNumber()))
	}

	toString(): string {
		return `${this._value.toFixed(2)} ${this._currency}`
	}

	toFormattedString(): string {
		return new Intl.NumberFormat('pt-BR', {
			style: 'currency',
			currency: this._currency,
		}).format(toNumber(this._value))
	}

	toNumber(): number {
		return toNumber(this._value)
	}

	toFixedNumber(decimalPlaces: number): number {
		return toFixedNumber(this._value, decimalPlaces)
	}
}
