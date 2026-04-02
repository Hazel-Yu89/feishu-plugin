import { Form, Select, InputNumber } from 'antd';

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
  const handleValueChange = (values: any) => {
    const newConfig = { ...config, ...values };
    onConfigChange(newConfig);
    if (window.dashboard) {
      window.dashboard.setConfig(newConfig);
    }
  };

  return (
    <div>
      <h3 style={{ marginBottom: '20px' }}>指标卡设置</h3>
      <Form
        initialValues={config}
        onValuesChange={handleValueChange}
        layout="vertical"
      >
        <Form.Item label="显示格式" name="format">
          <Select>
            <Select.Option value="TEXT">纯数字</Select.Option>
            <Select.Option value="MM:SS">分:秒</Select.Option>
            <Select.Option value="HH:MM:SS">时:分:秒</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="变色条件" name="condition">
          <Select>
            <Select.Option value=">">大于</Select.Option>
            <Select.Option value="<">小于</Select.Option>
            <Select.Option value="=">等于</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="阈值" name="threshold">
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item label="满足条件颜色" name="targetColor">
          <Select>
            <Select.Option value="red">红色</Select.Option>
            <Select.Option value="green">绿色</Select.Option>
            <Select.Option value="blue">蓝色</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </div>
  );
}
