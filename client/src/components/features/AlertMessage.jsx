import React from 'react';

/**
 * AlertMessage displays error or success messages to the user.
 * 
 * @param {Object} props
 * @param {{ text: string, type: 'success' | 'error' } | null} props.message
 */
export const AlertMessage = ({ message }) => {
  if (!message || !message.text) return null;

  const isSuccess = message.type === 'success';

  const containerClasses = isSuccess
    ? 'bg-emerald-500/10 border-emerald-500/25 text-emerald-300'
    : 'bg-rose-500/10 border-rose-500/25 text-rose-300';

  return (
    <div
      className={`mt-3.5 text-sm py-2.5 px-3.5 rounded-xl border flex items-center gap-2 transition-all duration-200 ${containerClasses}`}
      role="alert"
    >
      <span>{message.text}</span>
    </div>
  );
};
