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
    // 飞书环境：获取配置
    window.dashboard.getConfig().then((res: any) => {
      if (res) setConfig(res);
    });
    // 监听配置变化
    const off = window.dashboard.onConfigChange(() => {
      window.dashboard.getConfig().then((res: any) => {
        if (res) setConfig(res);
      });
    });
    return () => off?.();
  }, []);

  const displayValue = data;
  const format = config.format || 'TEXT';
  const condition = config.condition || '>';
  const threshold = config.threshold || 60;
  const targetColor = config.targetColor || 'red';
  const finalColor = getDynamicColor(displayValue, condition, threshold, targetColor, '#000');

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100%' 
    }}>
      <div style={{ fontSize: '48px', fontWeight: 'bold', color: finalColor }}>
        {formatTime(displayValue, format)}
      </div>
    </div>
  );
}
