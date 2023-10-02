import React from 'react';
import { useForm, Controller, SubmitHandler, Control } from 'react-hook-form';
import jsonData from '../data.json';
import './style.css';

type FormValues = {
  [key: string]: string | number | boolean;
};

type InputFieldProps = {
  item: typeof jsonData[number];
  control: Control<FormValues>;
};

const InputField: React.FC<InputFieldProps> = ({ item, control }) => {
  return (
    <Controller
      name={`field${item.label}`}
      control={control}
      defaultValue={String(item.default_value)}
      render={({ field }) => (
        <>
          {item.type === 'text' && (
            <input
              type="text"
              {...field}
              pattern={item.validation || undefined}
              className="form-input"
              value={field.value as string}
            />
          )}
          {item.type === 'longtext' && (
            <textarea
              {...field}
              {...(item.validation && { pattern: new RegExp(item.validation) })}
              className="form-input"
              value={field.value as string}
            />
          )}
          {item.type === 'dropdown' && (
            <select
              {...field}
              className="form-select"
              value={String(field.value)} 
            >
              {item.options?.map((option, optionIndex) => (
                <option key={optionIndex} value={String(option)}>
                  {option}
                </option>
              ))}
            </select>
          )}

          {item.type === 'number' && (
            <input
              type="number"
              {...field}
              min={item.min_value || 0}
              {...(item.max_value && { max: item.max_value })}
              className="form-input"
              value={field.value as number}
            />
          )}
        </>
      )}
    />
  );
};

const Form: React.FC = () => {
  const { handleSubmit, control } = useForm<FormValues>();
  const initialValues: FormValues = {};

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };

  jsonData.forEach((item) => {
    const fieldName = `field${item.label}`;
    initialValues[fieldName] = item.default_value || '';
  });

  return (
    <div className="bg-gray-800 form-container">
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        {jsonData.map((item, index) => (
          <div key={index}>
            <label className="form-label">{item.label}</label>
            <InputField item={item} control={control} />
          </div>
        ))}
        <button type="submit" className="form-button">
          Submit
        </button>
      </form>
    </div>
    
  );
};

export default React.memo(Form);
