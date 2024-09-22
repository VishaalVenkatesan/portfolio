import { useRef, useState, FormEvent } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { handleSubmit } from '@/firebase/handle-login'

export const useLoginForm = () => {
  const [error, setError] = useState('')
  const router = useRouter()
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const loginMutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      handleSubmit(email, password, setError, () => {}, router),
      onSuccess: () => {
        router.refresh()
      },
      onError: (error) => {
        console.error('Error in login mutation:', error)
        setError('An unexpected error occurred. Please try again.')
      },
  })

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (emailRef.current && passwordRef.current) {
      loginMutation.mutate({
        email: emailRef.current.value,
        password: passwordRef.current.value,
      })
    }
  }

  const handleInputChange = () => {
    if (error) setError('')
  }

  return {
    emailRef,
    passwordRef,
    error,
    isLoading: loginMutation.isPending,
    onSubmit,
    handleInputChange,
  }
}