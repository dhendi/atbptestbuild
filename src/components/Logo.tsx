import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
}) => {
  const heightClass = size === 'sm' ? 'h-9' : size === 'lg' ? 'h-16' : 'h-11';

  return (
    <div className={`inline-flex items-center gap-2 group cursor-pointer select-none ${className}`}>
      <img
        src="/logo.png"
        alt="at iba pa."
        className={`${heightClass} w-auto object-contain transition-transform group-hover:scale-102`}
      />
    </div>
  );
};
