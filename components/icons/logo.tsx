import React from 'react';

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <div className={className}>
      <svg 
        width="100%" 
        height="100%" 
        viewBox="0 0 24 24" 
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <use href="/assets/logo.svg#logo" />
      </svg>
    </div>
  );
}
