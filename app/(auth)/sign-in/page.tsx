"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Eye, EyeOff, ArrowRight, Loader2 } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import { toast } from "sonner"
import axios,{AxiosError} from "axios"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { signInSchema } from "@/schema/signinSchema"
import { ApiResponse } from "@/types/ApiResponse"

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()


  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  })

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    setIsSubmitting(true)
    try {
        const response = await axios.post(`/api/sign-in`, data);
        toast.success(response.data.message);
        router.replace('/home');
    } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        toast.error(axiosError.response?.data.message ?? "Error signing in");
        router.replace(`/sign-up`);
    } finally {
        setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-muted/30 dark:bg-muted/10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid md:grid-cols-2 gap-0 w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl"
      >
        {/* Left Side - Image */}
        <div className="relative hidden md:block">
          <div className="absolute inset-0 bg-gradient-to-r from-rose-500 to-orange-500 z-0" />
          <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-10 z-0" />
          <Image src="/sign-up.jpg" alt="Login" fill className="object-cover mix-blend-overlay" />
          <div className="absolute inset-0 flex flex-col items-center justify-center p-12 z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center"
            >
              <h2 className="text-3xl font-bold text-white mb-4">Welcome Back!</h2>
              <p className="text-white/90 mb-8">Discover thousands of recipes and cook like a professional chef</p>
              <div className="flex justify-center">
                <motion.div
                  className="w-16 h-1 bg-white rounded-full"
                  animate={{ width: ["0%", "100%", "0%"] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="bg-background/80 backdrop-blur-xl p-8 md:p-12">
          <div className="flex flex-col h-full justify-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Get Started</h1>
                <p className="text-muted-foreground">Enter your credentials to access your account</p>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Email / Username */}
                  <FormField
                    name="identifier"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email / Username</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="text"
                            placeholder="name@example.com"
                            className="h-12 bg-background/50 backdrop-blur-sm focus-visible:ring-rose-500/50 focus-visible:border-rose-500/50"
                            required
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Password */}
                  <FormField
                    name="password"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex justify-between">
                          <FormLabel>Password</FormLabel>
                          <Link href="/forgot-password" className="text-sm text-rose-500 hover:text-rose-600">
                            Forgot password?
                          </Link>
                        </div>
                        <FormControl>
                          <div className="relative">
                            <Input
                              {...field}
                              type={showPassword ? "text" : "password"}
                              placeholder="••••••••"
                              className="h-12 pr-10 bg-background/50 backdrop-blur-sm focus-visible:ring-rose-500/50 focus-visible:border-rose-500/50"
                              required
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            >
                              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Remember Me */}
                  <div className="flex items-center space-x-2">
                    <Checkbox id="remember" />
                    <Label htmlFor="remember" className="text-sm font-normal">
                      Remember me for 10 days
                    </Label>
                  </div>

                  {/* Submit */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white rounded-full shadow-glow-sm hover:shadow-glow transition-all duration-300 group"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
                      </>
                    ) : (
                      <>
                        Sign In
                        <ArrowRight size={16} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                      </>
                    )}
                  </Button>
                </form>
              </Form>
              {/* Sign up link */}
              <p className="text-center text-sm text-muted-foreground mt-6">
                Don&apos;t have an account?{" "}
                <Link href="/sign-up" className="text-rose-500 hover:text-rose-600 font-medium">
                  Sign up
                </Link>
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default dynamic(() => Promise.resolve(LoginPage), { ssr: false })
