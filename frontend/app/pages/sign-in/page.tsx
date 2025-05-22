'use client';
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/hooks/useAuth';

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
      router.push('/');
    } catch (err: any) {
      throw new Error(err || 'Something went wrong. Please try again.');
    }
  };

  const t = AUTH_TEXT[signInType];

  return (
    <div className="min-h-screen bg-gray-700 flex items-center justify-center px-8 py-16">
      <div className="w-full max-w-7xl bg-gradient-to-r from-gray-600 via-gray-500 to-gray-600 rounded-xl shadow-md p-8 space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-extrabold text-white tracking-tight">{t.title}</h1>
          <p className="text-sm font-light text-gray-100">{t.subtitle}</p>
        </div>

        {error && (
          <div className="bg-red-500/10 text-red-300 p-3 rounded-md text-sm text-center">
            {error.message}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-6 max-w-md mx-auto">
            <div>
              <label className="block text-sm font-light text-gray-100">Email</label>
              <input
                type="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: 'Invalid email address',
                  },
                })}
                className="mt-1 w-full p-2 bg-transparent border-b border-gray-300 text-white focus:border-cyan-300 outline-none transition-colors duration-200 placeholder:text-gray-300"
                placeholder="Enter email"
              />
              {errors.email && (
                <p className="text-red-300 text-xs mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-light text-gray-100">Password</label>
              <input
                type="password"
                {...register('password', { required: 'Password is required' })}
                className="mt-1 w-full p-2 bg-transparent border-b border-gray-300 text-white focus:border-cyan-300 outline-none transition-colors duration-200 placeholder:text-gray-300"
                placeholder="Enter password"
              />
              {errors.password && (
                <p className="text-red-300 text-xs mt-1">{errors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting || authLoading}
              className="w-full bg-cyan-300 text-gray-900 py-2 rounded-lg font-semibold hover:bg-cyan-400 disabled:bg-gray-300 transition-colors duration-200"
              aria-disabled={isSubmitting || authLoading}
            >
              {isSubmitting || authLoading ? 'Loading...' : t.button}
            </button>
          </div>
        </form>

        <div className="text-center">
          <p className="text-sm font-light text-gray-100">
            {t.switchPrompt}{' '}
            <button
              onClick={() => setSignInType((prev) => (prev === 'login' ? 'register' : 'login'))}
              className="text-cyan-300 hover:text-cyan-400 font-semibold transition-colors duration-200"
              aria-label={`Switch to ${t.switchAction.toLowerCase()}`}
            >
              {t.switchAction}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}