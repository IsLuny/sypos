import { FastifyFC } from '@/infra/http/fastify'

import { AuthRoute } from './auth.route'
import { UsersRoute } from './users.route'

export const WorkspaceRoute: FastifyFC = (fastify) => {
	fastify.register(UsersRoute, { prefix: '/users' })
	fastify.register(AuthRoute, { prefix: '/auth' })
}