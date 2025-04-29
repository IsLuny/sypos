import { fastify, FastifyHttpOptions } from 'fastify'
import http from 'node:http'

import type { FastifyTypedInstance } from './fastify'

export interface HttpAppOptions {
    fastify?: FastifyHttpOptions<http.Server>
    hostname: string
    port: number
}

export class HttpServer {
	fastify: FastifyTypedInstance
	hostname: string
	port: number

	constructor(options: HttpAppOptions) {
		this.fastify = fastify(options.fastify)

		this.hostname = options.hostname
		this.port = options.port
	}

	get route() {
		return this.fastify.route.bind(this.fastify)
	}

	get register() {
		return this.fastify.register.bind(this.fastify)
	}

	get get() {
		return this.fastify.get.bind(this.fastify)
	}

	get post() {
		return this.fastify.post.bind(this.fastify)
	}

	get put() {
		return this.fastify.put.bind(this.fastify)
	}

	get delete() {
		return this.fastify.delete.bind(this.fastify)
	}

	get patch() {
		return this.fastify.patch.bind(this.fastify)
	}

	listen() {
		return new Promise<{ hostname: string, port: number, address: string }>((resolve, reject) => {
			const { hostname: host, port } = this

			const { signal } = new AbortController()

			this.fastify.listen(
				{
					port,
					host,
					exclusive: false,
					signal,
				},
				(error, address) => {
					if(error) reject(error)
					else resolve({ hostname: host, port, address })
				}
			)
		})
	}
}