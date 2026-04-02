import { useEffect, useState } from 'react';
import { formatTime, getDynamicColor } from '../utils';

const isDashboardEnv = !!window.dashboard;

export default function IndicatorCard({ data }: { data: number }) {
  const [config, setConfig] = useState<any>({
    format: 'TEXT',
    condition: '>',
    threshold: 60,
    targetColor: 'red'
  });

  useEffect(() => {
    if (!isDashboardEnv) return;
    window.dashboard.getConfig().then((res: any) => {
      if (res) setConfig(res);
    });
    const off = window.dashboard.onConfigChange(() => {
      window.dashboard.getConfig().then((res: any) => {
        if (res) setConfig(res);
      });
    });
    return () => off?.();
  }, []);

  const finalColor = getDynamicColor(
    data,
    config.condition,
    config.threshold,
    config.targetColor,
    '#000'
  );

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%'
    }}>
      <div style={{ fontSize: 48, fontWeight: 'bold', color: finalColor }}>
        {formatTime(data, config.format)}
      </div>
    </div>
  );
}
