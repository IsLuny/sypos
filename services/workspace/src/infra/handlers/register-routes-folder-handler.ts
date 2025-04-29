import fs from 'node:fs'
import path from 'node:path'

import { HttpServer } from '@/infra/http/server'

const isDirectory = (pathString: string) => fs.lstatSync(pathString).isDirectory()

const routeFileRegex = /^.*\.route\.(ts|js)$/i

export class RegisterRoutesFolderHandler {
	filesPaths = [] as string[]

	constructor(readonly app: HttpServer,readonly dirname: string) {}

	load() {
		this.recursive(this.dirname)
	}

	private recursive(dirname: string) {
		const files = fs.readdirSync(dirname)

		for(const file of files) {
			const pathString = path.resolve(dirname, file)

			if(isDirectory(pathString)) {
				this.recursive(pathString)
				continue
			}

			if(!routeFileRegex.test(file)) {
				continue
			}

			require(pathString)

			this.filesPaths.push(pathString)
		}
	}
}