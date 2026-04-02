import { formatTime, getDynamicColor } from '../utils';

interface IndicatorCardProps {
  data: number;
  config: {
    format: string;
    condition: string;
    threshold: number;
    targetColor: string;
  };
}

export default function IndicatorCard({ data, config }: IndicatorCardProps) {
  const finalColor = getDynamicColor(
    data,
    config.condition,
    config.threshold,
    config.targetColor,
    '#000'
  );

  return (
    <div style={{ fontSize: '48px', fontWeight: 'bold', color: finalColor }}>
      {formatTime(data, config.format)}
    </div>
  );
}
