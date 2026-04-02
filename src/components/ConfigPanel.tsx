interface ConfigPanelProps {
  config: {
    format: string;
    condition: string;
    threshold: number;
    targetColor: string;
  };
  onConfigChange: (config: any) => void;
}

export default function ConfigPanel({ config, onConfigChange }: ConfigPanelProps) {
  const handleChange = (key: string, value: any) => {
    const newConfig = { ...config, [key]: value };
    onConfigChange(newConfig);
    if (window.dashboard) {
      window.dashboard.setConfig(newConfig);
    }
  };

  return (
    <div>
      <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: 600 }}>指标卡设置</h3>
      
      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px' }}>显示格式</label>
        <select 
          value={config.format} 
          onChange={(e) => handleChange('format', e.target.value)}
          style={{ 
            width: '100%', 
            padding: '8px 12px', 
            fontSize: '14px',
            border: '1px solid #dcdfe6',
            borderRadius: '4px',
            background: '#fff'
          }}
        >
          <option value="TEXT">纯数字</option>
          <option value="MM:SS">分:秒</option>
          <option value="HH:MM:SS">时:分:秒</option>
        </select>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px' }}>变色条件</label>
        <select 
          value={config.condition} 
          onChange={(e) => handleChange('condition', e.target.value)}
          style={{ 
            width: '100%', 
            padding: '8px 12px', 
            fontSize: '14px',
            border: '1px solid #dcdfe6',
            borderRadius: '4px',
            background: '#fff'
          }}
        >
          <option value=">">大于</option>
          <option value="<">小于</option>
          <option value="=">等于</option>
        </select>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px' }}>阈值</label>
        <input 
          type="number" 
          value={config.threshold} 
          onChange={(e) => handleChange('threshold', Number(e.target.value))}
          style={{ 
            width: '100%', 
            padding: '8px 12px', 
            fontSize: '14px',
            border: '1px solid #dcdfe6',
            borderRadius: '4px',
            background: '#fff'
          }}
          min={0}
        />
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px' }}>满足条件颜色</label>
        <select 
          value={config.targetColor} 
          onChange={(e) => handleChange('targetColor', e.target.value)}
          style={{ 
            width: '100%', 
            padding: '8px 12px', 
            fontSize: '14px',
            border: '1px solid #dcdfe6',
            borderRadius: '4px',
            background: '#fff'
          }}
        >
          <option value="red">红色</option>
          <option value="green">绿色</option>
          <option value="blue">蓝色</option>
        </select>
      </div>
    </div>
  );
}
