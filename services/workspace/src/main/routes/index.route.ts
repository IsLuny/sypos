import { FastifyFC, FastifyTypedInstance } from '@/infra/http/fastify'

import { WorkspaceRoute } from './workspace/workspace.route'

export const Routes: FastifyFC = (fastify: FastifyTypedInstance) => {
	fastify.register(WorkspaceRoute, { prefix: '/workspace' })
}