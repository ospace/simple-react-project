import { useState } from 'react';

export default function InputNumber({ className, value, onChange }) {
  const [data, setData] = useState(value || '');

  function onChangeData({ target: { value } }) {
    const newVal = value && value.replace(/[^0-9]/g, '');
    setData(newVal);
    'function' === typeof onChange && onChange(newVal);
  }

  return (
    <input
      type="text"
      className={className}
      value={data}
      onChange={onChangeData}
    ></input>
  );
}
