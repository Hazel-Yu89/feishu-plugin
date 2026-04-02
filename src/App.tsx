import { useEffect, useState } from 'react';
import ConfigPanel from './components/ConfigPanel';
import IndicatorCard from './components/IndicatorCard';

// 飞书环境全局类型声明
declare global {
  interface Window {
    dashboard?: {
      ready: (cb: () => void) => void;
      onDataChange: (cb: () => Promise<void>) => () => void;
      onConfigChange: (cb: () => Promise<void>) => () => void;
      getConfig: () => Promise<any>;
      setConfig: (config: any) => void;
      query: () => Promise<any>;
      isEditor: boolean; // 飞书原生：编辑模式标识
    };
  }
}

export default function App() {
  const [data, setData] = useState<number>(75);
  const [config, setConfig] = useState({
    format: 'TEXT',
    condition: '>',
    threshold: 60,
    targetColor: 'red'
  });
  // 核心：通过飞书SDK判断是否为编辑模式
  const [isEditor, setIsEditor] = useState(false);

  const isDashboardEnv = !!window.dashboard;

  useEffect(() => {
    if (!isDashboardEnv) return;

    window.dashboard!.ready(() => {
      // 飞书原生API：获取编辑模式状态
      setIsEditor(window.dashboard!.isEditor);

      // 初始化配置
      window.dashboard!.getConfig().then(res => {
        if (res) setConfig(res as any);
      });

      // 监听数据变化
      const offData = window.dashboard!.onDataChange(async () => {
        try {
          const res = await window.dashboard!.query({});
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
      const offConfig = window.dashboard!.onConfigChange(async () => {
        const res = await window.dashboard!.getConfig();
        if (res) setConfig(res as any);
      });

      return () => {
        offData();
        offConfig();
      };
    });
  }, []);

  return (
    <div style={{ 
      display: 'flex', 
      height: '100vh', 
      width: '100vw',
      overflow: 'hidden'
    }}>
      {/* 左侧：指标卡，始终全屏展示 */}
      <div style={{ 
        flex: 1, 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        background: '#fff'
      }}>
        <IndicatorCard data={data} config={config} />
      </div>

      {/* 右侧：设置面板，仅编辑模式可见，查看模式自动隐藏 */}
      {isEditor && (
        <div style={{ 
          width: '340px', 
          borderLeft: '1px solid #eee', 
          padding: '16px', 
          overflowY: 'auto',
          background: '#f8f9fa'
        }}>
          <ConfigPanel config={config} onConfigChange={setConfig} />
        </div>
      )}
    </div>
  );
}
