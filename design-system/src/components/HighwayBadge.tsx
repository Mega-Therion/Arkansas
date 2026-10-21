import type { HTMLAttributes } from 'react';

export type BadgeTone = 'live' | 'normal' | 'verified' | 'alert' | 'info' | 'neutral';

const toneLabels: Record<BadgeTone, string> = {
  live: 'LIVE',
  normal: 'NORMAL',
  verified: 'VERIFIED',
  alert: 'ALERT',
  info: 'INFO',
  neutral: 'SYSTEM'
};

type HighwayBadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: BadgeTone;
  children: string;
  mark?: string;
};

export function HighwayBadge({
  tone = 'neutral',
  children,
  mark,
  className = '',
  ...props
}: HighwayBadgeProps) {
  return (
    <span className={`highway-badge highway-badge--${tone} ${className}`.trim()} {...props}>
      <span className="highway-badge__paint" aria-hidden="true" />
      {mark ? <span className="highway-badge__mark" aria-hidden="true">{mark}</span> : null}
      <span className="highway-badge__text">{children}</span>
      <span className="highway-badge__state">{toneLabels[tone]}</span>
    </span>
  );
}
