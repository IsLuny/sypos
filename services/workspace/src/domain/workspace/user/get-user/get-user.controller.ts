import { APIUser } from '@sypos/api-types'

import { RequestContext } from '@/infra/http/context'

import { makeGetUserUsecase } from './get-user.make'

export async function getUserController(context: RequestContext<{
    Payload: {
        user_id: string,
        workspace_id: string
    },
	Reply: APIUser
}>) {
	try {
		const response = await makeGetUserUsecase().execute(context.Payload)
    
		if(response.isLeft()) {
			return context.reply(
				{
					message: response.value.message,
					description: response.value.description.toValue(),
					tag: response.value.tag,
				},
				response.value.statusCode
			)
		}
    
		return context.reply(response.value, 200)
	} catch (e) {
		throw e
	}
}