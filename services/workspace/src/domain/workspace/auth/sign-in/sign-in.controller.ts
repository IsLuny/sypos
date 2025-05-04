import { AuthTokenAdapter } from '@/core/helpers/adapters'
import { env } from '@/env'
import { RequestContext } from '@/infra/http/context'

import { makeSignInUsecase } from './sign-in.make'

export async function signInUser(context: RequestContext<{ 
    Payload: {
        sign_in_key: string, 
        password: string 
    },
	Reply: {
		auth_token: string
	}
}>) {
	try {
		const response = await makeSignInUsecase().execute(context.Payload)

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

		const value = response.value

		const authToken = await AuthTokenAdapter.sign(env.EXPIRE_TOKEN_IN_SECONDS, {
			user_id: value.user_id,
			workspace_id: value.workspace_id,
			role: value.role,
			permissions: value.permissions,
		})

		return context.reply({
			auth_token: authToken, 
		}, 200)
	} catch (e) {
		throw e
	}
}