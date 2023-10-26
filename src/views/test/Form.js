import React, {
  useState,
  //useRef,
  // useEffect,
  //useMemo,
  // useCallback,
  // useReducer,
  //createContext,
  //useContext,
} from 'react';
import { bindValue, bindFilters } from 'utils/cmm_';

let __key__ = 0;
const generateKey = () => {
  //return new Date().getTime();
  return __key__++;
};

function FormInputText({ value, onChange }) {
  return (
    <input
      type="text"
      value={value}
      onChange={bindValue(onChange)}
      key={generateKey()}
    ></input>
  );
}

function FormInputRadio({ value, items, onChange }) {
  return (
    <>
      {items.map((item) => (
        <label key={generateKey()}>
          <input
            type="radio"
            name={'rd_' + generateKey()}
            checked={item.value === value}
            value={item.value}
            onChange={bindValue(onChange)}
          ></input>
          {item.text}
        </label>
      ))}
    </>
  );
}

function FormInputCheck({ items, onChange }) {
  const formId = generateKey();
  const [data, setData] = useState(new Array(items.length).fill(false));

  function onChangeValue(idx) {
    const newData = data.map((it, i) => (i === idx ? !it : it));
    setData(newData);
    const checked = items.filter((item, idx) => newData[idx]);
    onChange(checked.map((it) => it.value));
  }

  return (
    <>
      {items &&
        items.map((item, idx) => (
          <label key={generateKey()}>
            <input
              type="checkbox"
              name={'ck_' + formId}
              checked={data[idx]}
              value={item.value}
              onChange={() => onChangeValue(idx)}
            ></input>
            {item.text}
          </label>
        ))}
    </>
  );
}

function Checkbox({ item, value, onChange }) {
  const data = !!~value.indexOf(item.value);

  return (
    <label>
      <input
        type="checkbox"
        checked={data}
        onChange={bindFilters(
          () =>
            data
              ? value.filter((it) => it !== item.value)
              : value.concat(item.value),
          onChange
        )}
      ></input>
      {item.text}
    </label>
  );
}

function FormInputCheck2({ value, items, onChange }) {
  return (
    <>
      {items &&
        items.map((item) => (
          <Checkbox
            key={generateKey()}
            item={item}
            value={value}
            onChange={onChange}
          ></Checkbox>
        ))}
    </>
  );
}

const FormTextarea = ({ value, onChange }) => (
  <textarea value={value} onChange={bindValue(onChange)}></textarea>
);

function FormSelect({ items, value, onChange }) {
  return (
    <select value={value} onChange={bindValue(onChange)}>
      <option value="">select</option>
      {items.map((it) => (
        <option value={it.value} key={generateKey()}>
          {it.text}
        </option>
      ))}
    </select>
  );
}

export default function Form() {
  const [value1, setValue1] = useState();
  const [value2, setValue2] = useState('1');
  const [value3, setValue3] = useState([]);
  const items = [
    { text: 'one', value: '1' },
    { text: 'two', value: '2' },
  ];
  return (
    <>
      <h1>Form</h1>
      <hr />
      <div>
        <h2>Input Text</h2>
        <FormInputText value={value1} onChange={setValue1}></FormInputText>{' '}
        {value1}
      </div>
      <hr />
      <div>
        <h2>Input Radio</h2>
        <FormInputRadio
          value={value2}
          items={items}
          onChange={setValue2}
        ></FormInputRadio>{' '}
        {value2}
      </div>
      <hr />
      <div>
        <h2>Input Check</h2>
        <FormInputCheck
          items={items}
          value={value3}
          onChange={setValue3}
        ></FormInputCheck>{' '}
        {value3}
      </div>
      <hr />
      <div>
        <h2>Input Check2</h2>
        <FormInputCheck2
          items={items}
          value={value3}
          onChange={setValue3}
        ></FormInputCheck2>{' '}
        {value3}
      </div>
      <hr />
      <div>
        <h2>Textarea</h2>
        <FormTextarea value={value1} onChange={setValue1}></FormTextarea>{' '}
        {value1}
      </div>
      <hr />
      <div>
        <h2>Select</h2>
        <FormSelect
          items={items}
          value={value2}
          onChange={setValue2}
        ></FormSelect>{' '}
        {value2}
      </div>
    </>
  );
}
