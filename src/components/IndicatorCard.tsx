import { formatTime, getDynamicColor } from '../utils';
import * as dashboard from '@lark-base-open/js-sdk';

interface IndicatorCardProps {
  data: number;
  config: dashboard.IConfig;
}

export default function IndicatorCard({ data, config }: IndicatorCardProps) {
  const format = config.format || 'TEXT';
  const condition = config.condition || '>';
  const threshold = config.threshold || 60;
  const targetColor = config.targetColor || 'red';

  const finalColor = getDynamicColor(data, condition, threshold, targetColor, '#000');

  return (
    <div style={{ fontSize: '48px', fontWeight: 'bold', color: finalColor }}>
      {formatTime(data, format)}
    </div>
  );
}
