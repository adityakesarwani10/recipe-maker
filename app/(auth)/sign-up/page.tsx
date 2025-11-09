"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Eye, EyeOff, ArrowRight, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ApiResponse } from '@/types/ApiResponse';
import { toast } from "sonner"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import axios, { AxiosError } from 'axios';
import { useDebounceCallback } from 'usehooks-ts';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import * as z from 'zod';
import { signUpSchema } from '@/schema/signupSchema'; 
import { useRouter } from 'next/navigation';

export default function SignupPage() {
    const [username, setUsername] = useState('');
    const [usernameMessage, setUsernameMessage] = useState('')
    const [isCheckingUsername, setIsCheckingUsername] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const debounced = useDebounceCallback(setUsername, 300);
    const router = useRouter();

    const form = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            username: '',
            email: '',
            password: '',   
        }
    })

    // Watch password for strength indicator
    const password = form.watch("password");

    useEffect(() => {
      const checkUsernameUnique = async () => {
        if (username.length >= 3) {
          setIsCheckingUsername(true);
          setUsernameMessage('');
          try {
            const response = await axios.get<ApiResponse>(
              `/api/check-username-unique?username=${username}`
            );
            setUsernameMessage(response.data.message);
          } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>;
            setUsernameMessage(
              axiosError.response?.data.message ?? 'Error checking username'
            );
          } finally {
            setIsCheckingUsername(false);
          }
        }
      };
      checkUsernameUnique();
    }, [username]);

    const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
        if(isCheckingUsername) {
            toast.error("Checking the username, please wait");
            return;
        }
        setIsSubmitting(true);

        try {
            const response = await axios.post<ApiResponse>(`/api/sign-up`, data);
            toast.success(response.data.message);
            router.replace(`/verify/${data.username}`);
        } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>;
            toast.error(axiosError.response?.data.message ?? "Error signing up");
            router.replace(`/sign-up`);
        } finally {
            setIsSubmitting(false);
        }
    }

    const passwordStrength = () => {
      if (!password) return 0;
      let strength = 0;
      if (password.length >= 8) strength += 1;
      if (/[A-Z]/.test(password)) strength += 1;
      if (/[0-9]/.test(password)) strength += 1;
      if (/[^A-Za-z0-9]/.test(password)) strength += 1;
      return strength;
    }

    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-muted/30 dark:bg-muted/10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid md:grid-cols-2 gap-0 w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl"
        >
          {/* Left Side - Form */}
          <div className="bg-background/80 backdrop-blur-xl p-8 md:p-12 order-2 md:order-1">
            <div className="flex flex-col h-full justify-center">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <h1 className="text-3xl font-bold mb-2">Sign Up</h1>
                  <p className="text-muted-foreground mb-6">
                    Create an account to save your favorite recipes
                  </p>

                  {/* First/Last Name (not in schema yet) */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="first-name">First Name</Label>
                      <Input id="first-name" placeholder="John" required />
                    </div>
                    <div>
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input id="last-name" placeholder="Doe" required />
                    </div>
                  </div>

                  {/* Username */}
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Username"
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              debounced(e.target.value);
                            }}
                          />
                        </FormControl>
                        {isCheckingUsername ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <p
                            className={`text-sm mt-1 ${
                              usernameMessage === 'Username is unique'
                                ? 'text-green-600'
                                : 'text-red-600'
                            }`}
                          >
                            {usernameMessage}
                          </p>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Email */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="name@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Password */}
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="••••••••"
                              {...field}
                              className="pr-10"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2"
                            >
                              {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />

                        {/* Strength Indicator */}
                        {password && (
                          <div className="mt-2">
                            <div className="flex gap-2 mb-1">
                              {[...Array(4)].map((_, i) => (
                                <div
                                  key={i}
                                  className={`h-1 flex-1 rounded-full ${
                                    i < passwordStrength()
                                      ? ["bg-red-500","bg-orange-500","bg-yellow-500","bg-green-500"][passwordStrength()-1]
                                      : "bg-muted"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        )}
                      </FormItem>
                    )}
                  />

                  {/* Terms */}
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" required />
                    <Label htmlFor="terms" className="text-sm font-normal">
                      I agree to the{" "}
                      <Link href="/terms" className="text-rose-500">Terms of Service</Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-rose-500">Privacy Policy</Link>
                    </Label>
                  </div>

                  {/* Submit */}
                  <Button type="submit" disabled={isSubmitting || isCheckingUsername} className="w-full">
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin"/> Please Wait
                      </>
                    ) : (
                      <>
                        Create Account
                        <ArrowRight size={16} className="ml-2"/>
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="relative order-1 md:order-2">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-rose-500 z-0" />
            <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-10 z-0" />
            <Image src="/sign-up.jpg" alt="Delicious food" fill className="object-cover mix-blend-overlay" />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-12 z-10">
              <h2 className="text-3xl font-bold text-white mb-4">Join Our Community</h2>
              <p className="text-white/90 mb-8">Create, save, and share your favorite recipes</p>
            </div>
          </div>
        </motion.div>
      </div>
    )
}
