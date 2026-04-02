import { useEffect, useState } from 'react';
import ConfigPanel from './components/ConfigPanel';
import IndicatorCard from './components/IndicatorCard';

const isLocalPreview = !window.lark;

export default function App() {
  const [state, setState] = useState<any>(
    isLocalPreview ? {} : undefined
  );
  const [data, setData] = useState<number>(0);

  useEffect(() => {
    if (isLocalPreview) return;

    // 兼容飞书SDK，移除不存在的DashboardState类型
    window.dashboard?.onStateChange((newState: any) => {
      setState(newState);
    });

    const offData = window.dashboard?.onDataChange(async () => {
      try {
        const res = await window.dashboard?.query({});
        if (res?.data?.list?.length > 0) {
          const value = Number(res.data.list[0][Object.keys(res.data.list[0])[0]]);
          setData(isNaN(value) ? 0 : value);
        }
      } catch (e) {}
    });

    return () => {
      offData?.();
    };
  }, []);

  if (state) {
    return (
      <div style={{ display: 'flex', height: '100vh', width: '100vw' }}>
        <div style={{ flex: 1, background: 'var(--semi-color-bg-1)' }}>
          <IndicatorCard data={data} />
        </div>
        <div style={{ width: '340px', borderLeft: '1px solid var(--semi-color-border)', overflowY: 'auto', background: 'var(--semi-color-bg-1)' }}>
          <ConfigPanel />
        </div>
      </div>
    );
  }

  if (isLocalPreview) {
    return (
      <div style={{ display: 'flex', height: '100vh', width: '100vw' }}>
        <div style={{ flex: 1, background: 'var(--semi-color-bg-1)' }}>
          <IndicatorCard data={75} />
        </div>
        <div style={{ width: '340px', borderLeft: '1px solid var(--semi-color-border)', overflowY: 'auto', background: 'var(--semi-color-bg-1)' }}>
          <ConfigPanel />
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: 20, background: 'var(--semi-color-bg-1)', height: '100vh' }}>
      <h3>插件已准备就绪 🚀</h3>
      <p>请在飞书多维表格仪表盘使用</p>
    </div>
  );
}
