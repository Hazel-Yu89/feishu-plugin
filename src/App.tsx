import { useEffect, useState } from 'react';
import ConfigPanel from './components/ConfigPanel';
import IndicatorCard from './components/IndicatorCard';

const isDashboardEnv = !!window.dashboard;

export default function App() {
  const [data, setData] = useState<number>(0);

  useEffect(() => {
    if (!isDashboardEnv) {
      setData(75);
      return;
    }

    const offData = window.dashboard.onDataChange(async () => {
      try {
        const res = await window.dashboard.query({});
        if (res?.data?.list?.length > 0) {
          const firstField = Object.keys(res.data.list[0])[0];
          const value = Number(res.data.list[0][firstField]);
          setData(isNaN(value) ? 0 : value);
        }
      } catch (e) {
        console.error(e);
      }
    });

    return () => {
      offData?.();
    };
  }, []);

  if (isDashboardEnv) {
    return (
      <div style={{ display: 'flex', height: '100vh', width: '100vw' }}>
        <div style={{ flex: 1 }}>
          <IndicatorCard data={data} />
        </div>
        <div style={{ width: 340, borderLeft: '1px solid #eee' }}>
          <ConfigPanel />
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
      <IndicatorCard data={data} />
    </div>
  );
}
