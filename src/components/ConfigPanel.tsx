import { useEffect, useState } from 'react';
import { Form, Select, InputNumber } from '@douyinfe/semi-ui';

const isDashboardEnv = !!window.dashboard;

export default function ConfigPanel() {
  const [config, setConfig] = useState<any>({
    format: 'TEXT',
    condition: '>',
    threshold: 60,
    targetColor: 'red'
  });

  useEffect(() => {
    if (!isDashboardEnv) return;
    // 飞书环境：获取已保存的配置
    window.dashboard.getConfig().then((res: any) => {
      if (res) setConfig(res);
    });
  }, []);

  const handleValuesChange = (values: any) => {
    const newConfig = { ...config, ...values };
    setConfig(newConfig);
    if (isDashboardEnv) {
      // 飞书环境：保存配置到仪表盘
      window.dashboard.setConfig(newConfig);
    }
  };

  return (
    <div style={{ padding: 16 }}>
      <h3>指标卡设置</h3>
      <Form 
        initValues={config} 
        onValuesChange={handleValuesChange}
        style={{ width: '100%' }}
      >
        <Form.Select
          field="format"
          label="显示格式"
          initValue="TEXT"
          style={{ width: '100%', marginBottom: 16 }}
        >
          <Select.Option value="TEXT">纯数字</Select.Option>
          <Select.Option value="MM:SS">分:秒</Select.Option>
          <Select.Option value="HH:MM:SS">时:分:秒</Select.Option>
        </Form.Select>

        <Form.Select
          field="condition"
          label="变色条件"
          initValue=">"
          style={{ width: '100%', marginBottom: 16 }}
        >
          <Select.Option value=">">大于</Select.Option>
          <Select.Option value="<">小于</Select.Option>
          <Select.Option value="=">等于</Select.Option>
        </Form.Select>

        <Form.InputNumber
          field="threshold"
          label="阈值"
          initValue={60}
          style={{ width: '100%', marginBottom: 16 }}
        />

        <Form.Select
          field="targetColor"
          label="满足条件颜色"
          initValue="red"
          style={{ width: '100%' }}
        >
          <Select.Option value="red">红色</Select.Option>
          <Select.Option value="green">绿色</Select.Option>
          <Select.Option value="blue">蓝色</Select.Option>
        </Form.Select>
      </Form>
    </div>
  );
}
