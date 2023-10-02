import React from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import jsonData from '../data.json';
import './style.css';


type FormValues = {
    [key: string]: string | number | boolean;
};

export const Form: React.FC = () => {
    const { handleSubmit, control } = useForm<FormValues>();
    const initialValues: FormValues = {};

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        console.log(data);
    };

    jsonData.forEach((item, index) => {
        const fieldName = `field${index}`;
        initialValues[fieldName] = item.default_value || '';
    });

    return (
        <div className="bg-gray-800 form-container">
            <form onSubmit={handleSubmit(onSubmit)} className="form">
                {jsonData.map((item, index) => (
                    <div key={index}>
                        <label className="form-label">{item.label}</label>
                        <Controller
                            name={`field${index}`}
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
                                        <select {...field} className="form-select" value={field.value as string}>
                                            {item.options?.map((option, optionIndex) => (
                                                <option key={optionIndex} value={option as string}>
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
                    </div>
                ))}
                <button type="submit" className="form-button">
                    Submit
                </button>
            </form>
        </div>
    );
};
