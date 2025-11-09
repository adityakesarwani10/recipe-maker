"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useRouter, useParams } from "next/navigation"
import { useState } from 'react'
import { toast } from "sonner"
import * as z from 'zod';
import axios, { AxiosError } from 'axios';
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { ApiResponse } from "@/types/ApiResponse"
import { verifySchema } from "@/schema/verifySchema"

export default function InputOTPForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const params = useParams<{username: string}>();
  const username = params.username as string
  
  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
  })

  const onSubmit = async (data: z.infer<typeof verifySchema>) => {          
          setIsSubmitting(true)
  
          try {
            const response = await axios.post<ApiResponse>('/api/verify-code', {
              username: encodeURIComponent(username),
              code: data.code
            })
              toast.success(response.data.message)
              router.replace(`/sign-in`)
          } catch (error) {
              const axiosError = error as AxiosError<ApiResponse>
              toast.error(axiosError.response?.data.message ?? "Error signing up")
              router.replace(`/sign-up`)
          }
          finally {
              setIsSubmitting(false)
          }
      }

  return (
    <div className='flex justify-center items-center min-h-screen bg-muted/30 dark:bg-muted/10 bg-gradient-to-br from-black via-black to-orange-700'>
        <div className='bg-background/80 backdrop-blur-x w-full max-w-md p-8 space-y-8 rounded-lg shadow-md'>
            <div className='text-center'>
                <h2 className='text-3xl  font-extrabold tracking-tight lg:text-5xl mb-6'>Verification Code</h2>
            </div>
            <div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                    <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>One-Time Password</FormLabel>
                        <FormControl>
                            <InputOTP maxLength={6} {...field}>
                            <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                                <InputOTPSlot index={3} />
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                            </InputOTPGroup>
                            </InputOTP>
                        </FormControl>
                        <FormDescription>
                            Please enter the one-time password sent to your phone.
                        </FormDescription>
                        <FormMessage />
                        </FormItem>
                    )}
                    />

                    <Button type="submit">
                      {
                        isSubmitting ? (
                          <>
                            <Loader2 className='mr-2 h-4 w-4 animate-spin'/> Please Wait
                          </>
                        ) : ('Submit')
                      }
                    </Button>
                </form>
            </Form>
          </div>
        </div>
    </div>
  )
}
