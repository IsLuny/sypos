
import { FastifyFC } from '@/infra/http/fastify'

export const UsersRoute: FastifyFC = (fastify) => {
	fastify.route({
		url: '/@me',
		method: 'GET',
		schema: {
		},
		handler(request, response) {
			console.log(request.cookies)
			console.log(request.headers)
		},
	})
}