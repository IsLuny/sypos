import { FastifyFC, FastifyTypedInstance } from '@/infra/http/fastify'

import { WorkspaceRoute } from './workspace/workspace.route'

export const APIv1Route: FastifyFC = (fastify: FastifyTypedInstance) => {
	fastify.register(WorkspaceRoute, { prefix: '/workspace' })
}