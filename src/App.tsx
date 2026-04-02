import { useEffect, useState } from 'react';
import ConfigPanel from './components/ConfigPanel';
import IndicatorCard from './components/IndicatorCard';
import * as dashboard from '@lark-base-open/js-sdk';

export default function App() {
  const [data, setData] = useState<number>(75);
  const [config, setConfig] = useState({
    format: 'TEXT',
    condition: '>',
    threshold: 60,
    targetColor: 'red'
  });

  const isDashboardEnv = !!window.dashboard;

  useEffect(() => {
    if (!isDashboardEnv) return;

    dashboard.ready(() => {
      // 初始化配置
      dashboard.getConfig().then(res => {
        if (res) setConfig(res as any);
      });

      // 监听数据变化
      const offData = dashboard.onDataChange(async () => {
        try {
          const res = await dashboard.query({});
          if (res?.data?.list?.length > 0) {
            const firstField = Object.keys(res.data.list[0])[0];
            const value = Number(res.data.list[0][firstField]);
            setData(isNaN(value) ? 0 : value);
          }
        } catch (e) {
          console.error('数据获取失败:', e);
        }
      });

      // 监听配置变化
      const offConfig = dashboard.onConfigChange(async () => {
        const res = await dashboard.getConfig();
        if (res) setConfig(res as any);
      });

      return () => {
        offData();
        offConfig();
      };
    });
  }, []);

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw' }}>
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <IndicatorCard data={data} config={config} />
      </div>
      <div style={{ width: '340px', borderLeft: '1px solid #eee', padding: '16px', overflowY: 'auto' }}>
        <ConfigPanel config={config} onConfigChange={setConfig} />
      </div>
    </div>
  );
}
