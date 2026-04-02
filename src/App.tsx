import { useEffect, useState } from 'react';
import ConfigPanel from './components/ConfigPanel';
import IndicatorCard from './components/IndicatorCard';

// 飞书仪表盘环境判断
const isDashboardEnv = !!window.dashboard;

export default function App() {
  const [state, setState] = useState<any>(null);
  const [data, setData] = useState<number>(0);

  useEffect(() => {
    if (!isDashboardEnv) {
      // 非飞书环境，显示测试数据
      setData(75);
      return;
    }

    // 飞书环境：正确初始化SDK
    window.dashboard.onStateChange((newState: any) => {
      setState(newState);
    });

    // 监听数据变化
    const offData = window.dashboard.onDataChange(async () => {
      try {
        const res = await window.dashboard.query({});
        if (res?.data?.list?.length > 0) {
          const firstField = Object.keys(res.data.list[0])[0];
          const value = Number(res.data.list[0][firstField]);
          setData(isNaN(value) ? 0 : value);
        }
      } catch (e) {
        console.error('数据获取失败:', e);
      }
    });

    return () => {
      offData?.();
    };
  }, []);

  // 飞书环境：显示完整界面（指标卡+配置面板）
  if (isDashboardEnv) {
    return (
      <div style={{ display: 'flex', height: '100vh', width: '100vw' }}>
        <div style={{ flex: 1, background: 'var(--semi-color-bg-1, #fff)' }}>
          <IndicatorCard data={data} />
        </div>
        <div style={{ 
          width: '340px', 
          borderLeft: '1px solid var(--semi-color-border, #eee)', 
          overflowY: 'auto', 
          background: 'var(--semi-color-bg-1, #fff)' 
        }}>
          <ConfigPanel />
        </div>
      </div>
    );
  }

  // 非飞书环境：只显示指标卡（预览用）
  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', justifyContent: 'center', alignItems: 'center' }}>
      <IndicatorCard data={data} />
    </div>
  );
}
