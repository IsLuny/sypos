import bcrypt from 'bcrypt'

export class BcryptAdapter {
	constructor(readonly salt: string | number) {}

	hash(plaintext: string): Promise<string> {
		return bcrypt.hash(plaintext, this.salt)
	}

	compare(digest: string, plaintext: string): Promise<boolean> {
		return bcrypt.compare(plaintext, digest)
	}
}
