import React from 'react';

interface InputProps {
  className?: string;
  [key: string]: any;
}

export default function Input({
  className = '',
  ...props
}: InputProps) {
  const baseClass = 'form-control';
  const combinedClass = `${baseClass} ${className}`.trim();

  const { as: Component = 'input', children, ...rest } = props;

  return (
    <Component className={combinedClass} {...rest}>
    </Component>
  );
}