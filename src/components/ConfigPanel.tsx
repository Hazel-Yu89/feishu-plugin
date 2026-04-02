import { Form, Select, InputNumber } from '@douyinfe/semi-ui';
import * as dashboard from '@lark-base-open/js-sdk';

interface ConfigPanelProps {
  config: dashboard.IConfig;
  onConfigChange: (config: dashboard.IConfig) => void;
}

export default function ConfigPanel({ config, onConfigChange }: ConfigPanelProps) {
  const handleValueChange = (values: Partial<dashboard.IConfig>) => {
    const newConfig = { ...config, ...values };
    onConfigChange(newConfig);
    // 飞书标准配置保存
    dashboard.setConfig(newConfig);
  };

  return (
    <div>
      <h3 style={{ marginBottom: '20px' }}>指标卡设置</h3>
      <Form
        initValues={config}
        onValueChange={handleValueChange}
        style={{ width: '100%' }}
      >
        <Form.Select
          field="format"
          label="显示格式"
          initValue="TEXT"
          style={{ width: '100%', marginBottom: '16px' }}
        >
          <Select.Option value="TEXT">纯数字</Select.Option>
          <Select.Option value="MM:SS">分:秒</Select.Option>
          <Select.Option value="HH:MM:SS">时:分:秒</Select.Option>
        </Form.Select>

        <Form.Select
          field="condition"
          label="变色条件"
          initValue=">"
          style={{ width: '100%', marginBottom: '16px' }}
        >
          <Select.Option value=">">大于</Select.Option>
          <Select.Option value="<">小于</Select.Option>
          <Select.Option value="=">等于</Select.Option>
        </Form.Select>

        <Form.InputNumber
          field="threshold"
          label="阈值"
          initValue={60}
          style={{ width: '100%', marginBottom: '16px' }}
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
