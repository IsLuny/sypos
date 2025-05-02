import { sign, verify } from 'jsonwebtoken'

import { syposHttpErrors } from '../errors/codes/http'
import { Either, left, right } from '../errors/either'

interface JwtDecoded {
  expireAt: number
}

type VerifyResult = Either<{ name: keyof typeof syposHttpErrors, message: string }, JwtDecoded>

export class JwtAdapter {
	constructor(readonly secret: string) {}

	async sign(
		liveTtime: number,
		payload: Omit<JwtDecoded, 'expireAt'>
	): Promise<string> {
		const expireAt = Math.floor(Date.now() / 1000) + liveTtime

		const token = await sign(
			{
				...payload,
				expireAt,
			} as JwtDecoded, 
			this.secret
		)

		return token
	}

	async verify(
		token: string
	): Promise<VerifyResult> {
		try {
			const decodedToken = (await verify(token.replace(/^Bearer\s+/, ''), this.secret)) as JwtDecoded

			if(new Date(decodedToken.expireAt).getTime() < Date.now()) {
				return left({
					name: 'JwtAuthExpired',
					message: syposHttpErrors.JwtAuthExpired,
				})
			}

			return right(decodedToken)
		} catch (e) {
			return left({
				name: 'JwtAuthExpired',
				message: syposHttpErrors.JwtAuthInvalid,
			})
		}
	}
}
