import React from "react";
import { BackgroundEffects } from "../../components/features/BackgroundEffects";
import { RegisterCard } from "../../components/register/RegisterCard";
import { useRegisterForm } from "../../hooks/useRegisterForm";

/**
 * RegisterPage component
 * Assembles ambient background effects and the main Register card using the warm orange & charcoal color palette (#161316).
 */
const RegisterPage = () => {
  const registerFormState = useRegisterForm();

  return (
    <main className="min-h-screen w-full flex items-center justify-center relative bg-[#161316] p-4">
      {/* Background ambient orbs and grid */}
      <BackgroundEffects />

      {/* Main glassmorphic register card */}
      <RegisterCard {...registerFormState} />
    </main>
  );
};

export default RegisterPage;
