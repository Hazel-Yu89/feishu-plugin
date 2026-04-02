export default function ConfigPanel({ config, onConfigChange }) {
  const handleChange = (key, value) => {
    const newConfig = { ...config, [key]: value };
    onConfigChange(newConfig);
  };

  return (
    <div style={{ padding: '16px' }}>
      <h3>指标卡设置</h3>

      <div style={{ margin: '12px 0' }}>
        <label>显示格式：</label>
        <select
          value={config.format}
          onChange={(e) => handleChange('format', e.target.value)}
        >
          <option value="TEXT">纯数字</option>
          <option value="MM:SS">分:秒</option>
          <option value="HH:MM:SS">时:分:秒</option>
        </select>
      </div>

      <div style={{ margin: '12px 0' }}>
        <label>变色条件：</label>
        <select
          value={config.condition}
          onChange={(e) => handleChange('condition', e.target.value)}
        >
          <option value=">">大于</option>
          <option value="<">小于</option>
          <option value="=">等于</option>
        </select>
      </div>

      <div style={{ margin: '12px 0' }}>
        <label>阈值：</label>
        <input
          type="number"
          value={config.threshold}
          onChange={(e) => handleChange('threshold', Number(e.target.value))}
        />
      </div>

      <div style={{ margin: '12px 0' }}>
        <label>颜色：</label>
        <select
          value={config.targetColor}
          onChange={(e) => handleChange('targetColor', e.target.value)}
        >
          <option value="red">红色</option>
          <option value="green">绿色</option>
          <option value="blue">蓝色</option>
        </select>
      </div>
    </div>
  );
}
