'use client'
import { useCallback, useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { BsGithub, BsGoogle } from "react-icons/bs"

import Input from "@/app/components/inputs/Input"
import Button from "@/app/components/buttons/Button"
import AuthSocialButton from "./AuthSocialButton"
import axios from "axios";

type Variant = 'LOGIN' | 'REGISTER'

const AuthForm = () => {
    const [variant, setVariant] = useState<Variant>('LOGIN')
    const [isLoading, setIsLoading] = useState(false)

    const toggleVariant = useCallback(() => {
        if (variant === 'LOGIN') {
            setVariant('REGISTER')
        } else {
            setVariant('LOGIN')
        }
    }, [variant])

    const {
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)

        if (variant === 'REGISTER') {
            // NextAuth register
            axios.post('/api/register', data)
        }

        if (variant === 'LOGIN') {
            // NextAuth SignIn
        }
    }

    const socialAction = (action: string) => {
        setIsLoading(true)
        // NextAuth Social Sign In
    }

    return (
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
                <form className="space-y-6"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    {variant === 'REGISTER' && (
                        <Input label="Name" id="name" type="text" register={register} errors={errors} disabled={isLoading}/>
                    )}

                    <Input label="Email address" id="email" type="email" register={register} errors={errors} disabled={isLoading}/>
                    <Input label="Password" id="password" type="password" register={register} errors={errors} disabled={isLoading}/>

                    <div>
                        <Button
                            disabled={isLoading}
                            fullWidth
                            type="submit"
                        >{variant === 'LOGIN' ? "Sign in" : 'Register'}</Button>
                    </div>
                </form>

                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-white px-2 text-gray-500">Or Continue with</span>
                        </div>
                    </div>

                    <div className="mt-6 flex gap-2">
                        <AuthSocialButton icon={BsGithub} onClick={() => socialAction('github')}/>
                        <AuthSocialButton icon={BsGoogle} onClick={() => socialAction('google')}/>
                    </div>

                    <div className="flex gap-2 justify-center text-sm mt-6 text-gray-500">
                        <span>{variant === 'LOGIN' ? "New to Messenger?" : "Already have an account?"}</span>
                        <span onClick={toggleVariant} className="underline cursor-pointer">{variant === 'LOGIN' ? "Create an account" : "Login"}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
 
export default AuthForm;