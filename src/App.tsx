import { useEffect, useState } from 'react';
import { bitable, DashboardState } from '@lark-base-open/js-sdk';
import ConfigPanel from './components/ConfigPanel';
import IndicatorCard from './components/IndicatorCard';

const isLocalPreview = !window.lark?.bitable;

export default function App() {
  const [state, setState] = useState<DashboardState>(
    isLocalPreview ? DashboardState.Create : undefined
  );
  const [data, setData] = useState<number>(0);

  useEffect(() => {
    if (isLocalPreview) return;

    bitable.dashboard.getState().then((initState) => setState(initState)).catch(() => {});
    const offState = bitable.dashboard.onStateChange((newState) => setState(newState));

    const offData = bitable.dashboard.onDataChange(async () => {
      try {
        const res = await bitable.dashboard.query({});
        if (res?.data?.list?.length > 0) {
          const value = Number(res.data.list[0][Object.keys(res.data.list[0])[0]]);
          setData(isNaN(value) ? 0 : value);
        }
      } catch (e) {}
    });

    return () => {
      offState();
      offData();
    };
  }, []);

  if (state === DashboardState.Create || state === DashboardState.Config) {
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

  if (state === DashboardState.View || state === DashboardState.FullScreen) {
    return <IndicatorCard data={data} />;
  }

  return (
    <div style={{ padding: 20, background: 'var(--semi-color-bg-1)', height: '100vh' }}>
      <h3>插件已准备就绪 🚀</h3>
      <p>请复制链接到飞书多维表格仪表盘使用</p>
    </div>
  );
}