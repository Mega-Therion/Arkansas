import { Check } from 'lucide-react';

type VerificationSealProps = {
  label?: string;
  sublabel?: string;
  compact?: boolean;
};

export function VerificationSeal({
  label = 'Draft',
  sublabel = 'Arkansas system seal',
  compact = false
}: VerificationSealProps) {
  return (
    <div className={`verification-seal${compact ? ' verification-seal--compact' : ''}`} role="status" aria-label={label}>
      <span className="verification-seal__diamond" aria-hidden="true">
        <span className="verification-seal__pip"><Check size={11} strokeWidth={2.8} /></span>
      </span>
      <span className="verification-seal__copy">
        <span className="verification-seal__title">{label}</span>
        {!compact ? <span className="verification-seal__sub">{sublabel}</span> : null}
      </span>
      <span className="verification-seal__cert" aria-hidden="true">DRAFT</span>
    </div>
  );
}
