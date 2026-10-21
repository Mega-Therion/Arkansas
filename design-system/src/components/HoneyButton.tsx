import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type HoneyButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  variant?: 'primary' | 'quiet';
};

export function HoneyButton({
  children,
  leadingIcon,
  trailingIcon,
  variant = 'primary',
  className = '',
  type = 'button',
  ...props
}: HoneyButtonProps) {
  return (
    <button
      className={`honey-button honey-button--${variant} ${className}`.trim()}
      type={type}
      {...props}
    >
      {leadingIcon ? <span className="honey-button__icon">{leadingIcon}</span> : null}
      <span>{children}</span>
      {trailingIcon ? <span className="honey-button__trailing">{trailingIcon}</span> : null}
    </button>
  );
}
