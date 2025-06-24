'use client';
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/hooks/useAuth';
import Customs from '@/app/components/organisms/Customs';

type SignInForm = {
  email: string;
  password: string;
};

const AUTH_TEXT = {
  login: {
    title: 'Welcome Back',
    subtitle: 'Sign in to explore',
    button: 'Sign In',
    switchPrompt: 'New here?',
    switchAction: 'Create an account',
  },
  register: {
    title: 'Join Us',
    subtitle: 'Create your account',
    button: 'Register',
    switchPrompt: 'Already have an account?',
    switchAction: 'Sign in',
  },
};

export default function SignInPage() {
  const { register: createAccount, login, authLoading, error } = useAuth();
  const [signInType, setSignInType] = useState<'login' | 'register'>('login');
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInForm>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<SignInForm> = async (data) => {
    try {
      if (signInType === 'login') await login(data);
      if (signInType === 'register') await createAccount(data);
    } catch (err: any) {
      throw new Error(err || 'Something went wrong. Please try again.');
    }
    router.push("/investor")
  };

  const t = AUTH_TEXT[signInType];

  return (
    <div
      style={{ backgroundImage: "url('/backgrounds/Warm-nebula-BG.png')" }}
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative">
      {/* Blur Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-lg z-0" />

      {/* Auth Card */}
      <div className="relative z-10 w-full max-w-md mx-auto p-8 rounded-3xl shadow-2xl bg-white/10 border border-white/20 backdrop-blur-2xl text-white space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <Customs.Text colors={['#45fed5', '#646def']} textSize='text-4xl' >
            {signInType === "login" ? "Welcome Back" : "Get Started"}
          </Customs.Text>
          <p className="text-sm text-white/70 font-light">{t.subtitle}</p>
        </div>


        {/* Error */}
        {error && (
          <div className="bg-[#f93745]/20 text-[#f93745] p-3 rounded-md text-sm text-center border border-[#f93745]/40">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-5 flex flex-col">
            <div>
              <label className="block text-sm text-white/80 mb-1">Email</label>
              <input
                type="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: 'Invalid email address',
                  },
                })}
                className="w-full px-4 py-2 bg-white/10 border border-white/30 rounded-md text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#45fed5]"
                placeholder="Enter email here"
              />
              {errors.email && (
                <p className="text-[#f93745] text-xs mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm text-white/80 mb-1">Password</label>
              <input
                type="password"
                {...register('password', { required: 'Password is required' })}
                className="w-full px-4 py-2 bg-white/10 border border-white/30 rounded-md text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#45fed5]"
                placeholder="Enter password here"
              />
              {errors.password && (
                <p className="text-[#f93745] text-xs mt-1">{errors.password.message}</p>
              )}
            </div>
            <Customs.Button
              type='submit'
              disabled={isSubmitting || authLoading}
              colors={["#646def", "#f93745"]}
              className='w-1/2 self-center'
            >
              {isSubmitting || authLoading ? 'Loading...' : t.button}
            </Customs.Button>
          </div>
        </form>

        {/* Switch */}
        <div className="text-center">
          <p className="text-sm text-white/70">
            {t.switchPrompt}{' '}
            <button
              onClick={() => setSignInType((prev) => (prev === 'login' ? 'register' : 'login'))}
              className="text-[#9de2ff] font-semibold hover:text-white underline underline-offset-2 transition"
            >
              {t.switchAction}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
