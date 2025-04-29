import { env } from '@/env'
import { HttpServer } from '@/infra/http/server'

const createApp = () => {
	const app = new HttpServer({
		hostname: env.HOST,
		port: env.PORT,

		fastify: {
			logger: true,
		},
	})

	global.__app = app

	return app
}

export const app = global.__app ?? createApp()