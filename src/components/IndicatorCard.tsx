import { useEffect, useState } from 'react';
import { bitable } from '@lark-base-open/js-sdk';
import { formatTime, getDynamicColor } from '../utils';

const isLocalPreview = !window.lark?.bitable;

export default function IndicatorCard({ data }: { data: number }) {
  const [config, setConfig] = useState<any>({});

  useEffect(() => {
    if (isLocalPreview) return;
    bitable.dashboard.getConfig().then((res) => setConfig(res || {})).catch(() => {});
    const off = bitable.dashboard.onConfigChange(() => {
      bitable.dashboard.getConfig().then((res) => setConfig(res || {}));
    });
    return () => off();
  }, []);

  const displayValue = isLocalPreview ? 75 : data;
  const format = config.format || 'TEXT';
  const condition = config.condition || '>';
  const threshold = config.threshold || 60;
  const targetColor = config.targetColor || 'red';
  const finalColor = getDynamicColor(displayValue, condition, threshold, targetColor, '#000');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <div style={{ fontSize: '48px', fontWeight: 'bold', color: finalColor }}>
        {formatTime(displayValue, format)}
      </div>
    </div>
  );
}