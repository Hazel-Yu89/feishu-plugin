import { useEffect, useState } from 'react';
import { bitable } from '@lark-base-open/js-sdk';
import { Form, Select } from '@douyinfe/semi-ui';

export default function ConfigPanel() {
  const [config, setConfig] = useState<any>({});

  useEffect(() => {
    bitable.dashboard.getConfig().then((res) => setConfig(res || {})).catch(() => {});
  }, []);

  const handleValuesChange = (values: any) => {
    const newConfig = { ...config, ...values };
    setConfig(newConfig);
    bitable.dashboard.saveConfig(newConfig);
  };

  return (
    <div style={{ padding: 16 }}>
      <h3>指标卡设置</h3>
      <Form initValues={config} onValueChange={handleValuesChange}>
        <Form.Select field="format" label="显示格式" initValue="TEXT">
          <Select.Option value="TEXT">纯数字</Select.Option>
          <Select.Option value="MM:SS">分:秒</Select.Option>
          <Select.Option value="HH:MM:SS">时:分:秒</Select.Option>
        </Form.Select>
        <Form.Select field="condition" label="变色条件" initValue=">">
          <Select.Option value=">">大于</Select.Option>
          <Select.Option value="<">小于</Select.Option>
          <Select.Option value="=">等于</Select.Option>
        </Form.Select>
        <Form.InputNumber field="threshold" label="阈值" initValue={60} />
        <Form.Select field="targetColor" label="满足条件颜色" initValue="red">
          <Select.Option value="red">红色</Select.Option>
          <Select.Option value="green">绿色</Select.Option>
          <Select.Option value="blue">蓝色</Select.Option>
        </Form.Select>
      </Form>
    </div>
  );
}