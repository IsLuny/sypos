import { RequestContext } from '@/infra/http/fastify'

export async function loginUser(context: RequestContext<{ 
    Payload: { 
        sign_in_key: string, 
        password: string 
    }
}>) {
	return ''
}