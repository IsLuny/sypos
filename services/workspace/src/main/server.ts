import { fastifyCookie } from '@fastify/cookie'
import { fastifyCors } from '@fastify/cors'
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import { jsonSchemaTransform, serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod'

import { version } from '@/../package.json'
import { env } from '@/env'
import { logger } from '@/logger'

import { app } from './app'
import { Routes } from './routes/index.route'

export const setupServer = async() => {
	// Cors
	app.register(fastifyCors, { origin: '*' })

	// Swagger
	app.fastify.setValidatorCompiler(validatorCompiler)
	app.fastify.setSerializerCompiler(serializerCompiler)
	app.register(fastifySwagger, { 
		openapi: {
			info: {
				title: 'Sypos Workspaces API',
				version,
			},
			tags: [
				{ name: 'user', description: 'User related end-points' },
				{ name: 'workspace', description: 'Workspace related end-points' },
			],
		},
		
		transform: jsonSchemaTransform,
	})

	app.register(fastifySwaggerUi, {
		routePrefix: '/docs',
	})

	// Cookie
	app.register(fastifyCookie, {
		secret: env.COOKIE_SIGNATURE_SECRET,
		hook: 'onRequest',
		parseOptions: {},
	})

	app.get('/users', (request, reply) => {
		reply.code(200).send([])
	})

    // Register Routes
	app.register(Routes, { prefix: '/' })

	await app.listen().then(({ port, address }) => {
		logger.info(`Http Server is running on port ${port} (${address})`, { tags: 'Http Server' })
	})
}