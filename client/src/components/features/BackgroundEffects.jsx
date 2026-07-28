import React from 'react';

/**
 * BackgroundEffects component renders ambient background radial orbs and grid pattern
 * matching the warm amber/orange and dark charcoal color palette.
 */
export const BackgroundEffects = () => {
  return (
    <>
      {/* Canvas container for ambient blur orbs */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Warm Orange Ambient Orb (Top Right) */}
        <div
          className="absolute w-[550px] h-[550px] rounded-full blur-[110px] opacity-25 
                     bg-[radial-gradient(circle,_#FF6D29_0%,_transparent_70%)] 
                     -top-[15%] -right-[10%] animate-drift-slow"
        />

        {/* Deep Warm Brown Ambient Orb (Bottom Left) */}
        <div
          className="absolute w-[450px] h-[450px] rounded-full blur-[100px] opacity-35 
                     bg-[radial-gradient(circle,_#453027_0%,_transparent_75%)] 
                     -bottom-[10%] -left-[5%] animate-drift-reverse"
        />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-grid-pattern opacity-70" />
    </>
  );
};
