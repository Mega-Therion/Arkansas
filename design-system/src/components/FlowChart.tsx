type FlowChartProps = {
  range: '24H' | '7D' | '30D';
};

const series = {
  '24H': '0,86 48,78 96,84 144,58 192,66 240,44 288,52 336,30 384,38 432,20 480,31 528,16 576,27 624,10 672,22 720,7',
  '7D': '0,73 48,82 96,68 144,75 192,49 240,58 288,41 336,51 384,32 432,40 480,25 528,35 576,15 624,27 672,12 720,18',
  '30D': '0,83 48,69 96,76 144,64 192,71 240,55 288,63 336,48 384,57 432,34 480,41 528,27 576,35 624,18 672,24 720,8'
} satisfies Record<FlowChartProps['range'], string>;

export function FlowChart({ range }: FlowChartProps) {
  const points = series[range];
  const lastPoint = points.split(' ').at(-1)?.split(',') ?? ['720', '18'];
  return (
    <svg className="flow-chart" viewBox="0 0 720 150" role="img" aria-label={`Spring flow trend over ${range}`} preserveAspectRatio="none">
      <defs>
        <linearGradient id="flowFill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#38E1D3" stopOpacity=".25" />
          <stop offset="100%" stopColor="#38E1D3" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="flowStroke" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#00A896" />
          <stop offset="100%" stopColor="#1D70B8" />
        </linearGradient>
      </defs>
      {[24, 60, 96, 132].map((y) => <line key={y} x1="0" y1={y} x2="720" y2={y} className="flow-chart__grid" />)}
      <polygon points={`0,150 ${points} 720,150`} fill="url(#flowFill)" />
      <polyline points={points} fill="none" stroke="url(#flowStroke)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
      <circle cx={lastPoint[0]} cy={lastPoint[1]} r="6" fill="#FFFFFF" stroke="#00A896" strokeWidth="3" vectorEffect="non-scaling-stroke" />
      <circle cx={lastPoint[0]} cy={lastPoint[1]} r="11" fill="none" stroke="#00A896" strokeOpacity=".22" strokeWidth="1" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}
