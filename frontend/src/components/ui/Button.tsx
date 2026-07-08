import React from 'react';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  children: React.ReactNode;
  [key: string]: any;
}

export default function Button({
  variant = 'primary',
  className = '',
  children,
  ...props
}: ButtonProps) {
  const variantMap = {
    primary: 'btn',
    secondary: 'btn-secondary',
    outline: 'btn-outline'
  } as const;

  const baseClass = variantMap[variant] || variantMap.primary;
  const combinedClass = `${baseClass} ${className}`.trim();

  const { as: Component = 'button', ...rest } = props;

  return (
    <Component className={combinedClass} {...rest}>
      {children}
    </Component>
  );
}