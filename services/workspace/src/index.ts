import { setupDatabase } from '@/main/config'
import { setupServer } from '@/main/server'

export async function main() {
	await setupDatabase()
	await setupServer()
}

if(require.main === module) {
	main()
}