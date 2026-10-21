import type { ReactNode } from 'react';

type MetricCardProps = {
  label: string;
  value: string;
  unit?: string;
  trend: string;
  detail: string;
  icon: ReactNode;
  tone: 'pine' | 'sky' | 'honey' | 'spring';
};

export function MetricCard({ label, value, unit, trend, detail, icon, tone }: MetricCardProps) {
  return (
    <article className={`metric-card metric-card--${tone}`}>
      <div className="metric-card__top">
        <span className="metric-card__icon" aria-hidden="true">{icon}</span>
        <span className="metric-card__trend"><span aria-hidden="true">↗</span> {trend}</span>
      </div>
      <p className="metric-card__label">{label}</p>
      <div className="metric-card__value-row">
        <strong>{value}</strong>
        {unit ? <span>{unit}</span> : null}
      </div>
      <p className="metric-card__detail">{detail}</p>
      <span className="metric-card__edge" aria-hidden="true" />
    </article>
  );
}
