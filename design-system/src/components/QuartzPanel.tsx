import type { HTMLAttributes, ReactNode } from 'react';

type QuartzPanelProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  tone?: 'light' | 'pine' | 'quiet';
  sheen?: boolean;
};

export function QuartzPanel({
  children,
  className = '',
  tone = 'light',
  sheen = true,
  ...props
}: QuartzPanelProps) {
  return (
    <div
      className={`quartz-panel quartz-panel--${tone}${sheen ? ' quartz-panel--sheen' : ''} ${className}`.trim()}
      {...props}
    >
      {children}
    </div>
  );
}
