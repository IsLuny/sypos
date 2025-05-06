import { useForm } from "antd/es/form/Form";

import { Button, Form, Input } from "antd";
import FormItem from "../../components/form-item";
import { Link } from "react-router";

import { FaEnvelope } from "react-icons/fa6";

import logoWhite from "@/assets/logo-white.svg";
import logoDark from "@/assets/logo-black.svg";

interface ForgotPasswordForm {
    email: string
}

function ForgotPassword() {
    const [form] = useForm<ForgotPasswordForm>();

    const onSubmit = async () => {
        const { email } = await form.validateFields();

        alert(email);
    }
    
    return (
        <main className="flex h-screen items-center justify-center p-8">
            <section className="grid w-3/4 h-9/10 bg-[var(--white)] grid-cols-2 rounded-3xl shadow-2xl max-lg:grid-cols-1 max-md:w-9/10">
                <div className="flex bg-[var(--primary-color)] items-center justify-center rounded-l-3xl max-lg:hidden">
                    <img src={logoWhite} alt="Sypos Logo" className="w-1/2 h-auto" />
                </div>
                <div className="relative flex w-full flex-col items-center justify-center text-center">
                    <div className="absolute hidden h-20 items-end justify-center text-4xl gap-2 top-20 max-lg:flex">
                        <img src={logoDark} alt="Sypos Logo" className="w-20 h-20" />
                        <h1>Sypos</h1>
                    </div>
                    <h1 className="text-4xl pb-8">Esqueci minha senha</h1>
                    <Form form={form} className="w-3/4" layout="vertical" onSubmitCapture={onSubmit}>
                        <FormItem
                            name="email"
                            label="Email:"
                            rules={[{ required: true, message: "Informe seu email!" }]}
                            className="!mb-0"
                            hideRequired
                        >
                            <Input
                                type="email"
                                prefix={<FaEnvelope className="mr-1" />}
                                placeholder="Digite aqui seu email"
                            />
                        </FormItem>
                        <Link to="/login" className="block text-left pt-2 text-xs mb-6">
                            Já sabe sua senha?
                        </Link>
                        <Button htmlType="submit" className="!bg-[var(--primary-color)] !text-white">
                            Redefinir senha
                        </Button>
                    </Form>
                </div>
            </section>
        </main>
    );
}

export default ForgotPassword;