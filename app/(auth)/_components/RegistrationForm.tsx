'use client';

import { useState } from 'react';
import { apiRegister } from '../../../utils/api';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/shared/Button';
import InputField from '@/components/shared/InputField';
import { toast } from 'sonner';

const RegisterForm = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }

    try {
      await apiRegister({ username, email, password });
      toast("Registration Successful!")
      router.push('/login');
    } catch (err: any) {
      toast('Registration failed. Please try again.')
      // setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-2xl text-gray-800">
      <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">Create an Account</h2>
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}
      <form onSubmit={handleSubmit}>
        <InputField id="username" label="Username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        <InputField id="email" label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <InputField id="password" label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <InputField id="confirmPassword" label="Confirm Password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

        <Button type="submit" loading={loading}>Register</Button>
      </form>

      <div className="mt-6 text-center text-sm text-gray-600">
        <p>
          Already have an account?{' '}
          <Link href="/login" className="text-blue-500 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
