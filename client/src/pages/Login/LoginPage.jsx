import React from 'react';
import { useLoginForm } from '../../hooks/useLoginForm';
import { LoginCard } from '../../components/ui/LoginCard';
import { BackgroundEffects } from '../../components/features/BackgroundEffects';

const LoginPage = () => {
  const loginFormState = useLoginForm();
  return (
    <main className="min-h-screen w-full flex items-center justify-center relative bg-[#161316] p-4">
      <BackgroundEffects />
      <LoginCard {...loginFormState} />
    </main>
  );
};

export default LoginPage;