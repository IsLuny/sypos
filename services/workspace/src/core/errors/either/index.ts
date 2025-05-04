export type Either<L, R> = Left<L, R> | Right<L, R>

export class Left<L, R> {
	readonly value: L
	constructor(value: L) {
		this.value = value
	}

	isLeft(): this is Left<L, R> {
		return true
	}

	isRight(): this is Right<L, R> {
		return false
	}

	fold<T>(leftFn: (left: L) => T, rightFn: (right: R) => T): T {
		return leftFn(this.value)
	}
}

export class Right<L, R> {
	readonly value: R
	constructor(value: R) {
		this.value = value
	}

	isLeft(): this is Left<L, R> {
		return false
	}

	isRight(): this is Right<L, R> {
		return true
	}

	fold<T>(leftFn: (left: L) => T, rightFn: (right: R) => T): T {
		return rightFn(this.value)
	}
}

export const left = <L, R>(value: L): Either<L, R> => {
	return new Left(value)
}

export const right = <L, R>(value: R): Either<L, R> => {
	return new Right(value)
}
