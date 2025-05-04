import crypto, { type CipherGCMTypes } from 'node:crypto'

export class CryptoAdapter {
	constructor(
        private readonly secret: string, 
        private readonly inicializationVector: string, 
        readonly algorithm: CipherGCMTypes
	) {}

	encrypt(text: string): string {
		const secret = crypto
			.createHash('sha256')
			.update(this.secret)
			.digest()
		const iv = Buffer.from(this.inicializationVector, 'utf-8')
		const cipher = crypto.createCipheriv(this.algorithm, secret, iv)
		let encrypted = cipher.update(text, 'utf-8', 'hex')
		encrypted += cipher.final('hex')
		return encrypted
	}

	decrypt(encryptedData: string): string {
		const secret = crypto
			.createHash('sha256')
			.update(this.secret)
			.digest()
		const iv = Buffer.from(this.inicializationVector, 'utf-8') as unknown as string
		const decipher = crypto.createDecipheriv(
			this.algorithm,
			secret,
			Buffer.from(iv, 'hex')
		)
		let decrypted = decipher.update(encryptedData, 'hex', 'utf-8')
		decrypted += decipher.final('utf-8')
		return decrypted
	}
}
