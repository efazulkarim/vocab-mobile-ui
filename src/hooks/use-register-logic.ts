import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useLogin, useRegister } from '@/api/auth';
import { useAuth } from '@/lib';

const schema = z
  .object({
    fullName: z
      .string()
      .refine((val) => val === '' || val.length >= 2, {
        message: 'Name must be at least 2 characters',
      })
      .optional(),
    email: z.string().email('Enter a valid email'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z
      .string()
      .min(6, 'Password must be at least 6 characters'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords must match',
  });

export type RegisterFormValues = z.infer<typeof schema>;

export const useRegisterLogic = () => {
  const signIn = useAuth.use.signIn();
  const registerMutation = useRegister();
  const loginMutation = useLogin();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const isSubmitting = registerMutation.isPending || loginMutation.isPending;

  const handleRegister = async (values: RegisterFormValues) => {
    try {
      await registerMutation.mutateAsync({
        email: values.email.trim(),
        password: values.password,
        full_name: values.fullName?.trim(),
      });

      const loginResponse = await loginMutation.mutateAsync({
        email: values.email.trim(),
        password: values.password,
      });

      signIn({
        access: loginResponse.access_token,
        refresh: loginResponse.access_token,
      });
    } catch (error: any) {
      const detail = error.response?.data?.detail;

      if (typeof detail === 'object' && detail !== null) {
        Object.entries(detail).forEach(([key, value]) => {
          if (key === 'email' || key === 'password' || key === 'full_name') {
            form.setError(key === 'full_name' ? 'fullName' : (key as any), {
              type: 'manual',
              message: value as string,
            });
          } else {
            form.setError('root', { type: 'manual', message: value as string });
          }
        });
      } else {
        form.setError('root', {
          type: 'manual',
          message:
            typeof detail === 'string'
              ? detail
              : 'Registration failed. Please try again.',
        });
      }
    }
  };

  return {
    form,
    handleRegister,
    isSubmitting,
    errors: form.formState.errors,
  };
};
