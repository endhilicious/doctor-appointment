import React, { useRef, useState } from 'react';
import styles from './styles.module.scss';

export interface TextFieldInterface {
  className?: string;
  label?: string;
  placeholder?: string;
  styleWrapper?: any;
  style?: any;
  labelPosition?: 'inside' | 'outside' | 'inline';
  onKeyDown?: any;
  width?: string;
  id?: string;
}

const TextField = ({
  id = '',
  name,
  type = 'text',
  width = '100%',
  labelPosition = 'inside',
  placeholder = 'enter text here',
  style,
  label,
  className,
  styleWrapper,
  register,
  onFocus,
  onChange,
  onBlur
}: any) => {
  const inputRef = useRef<any>(null)
  const [isTriggered, setHasTrigger] = useState(false);
  const [value, setValue] = useState('')

  const handleBlur = (e: any) => {
    if (e?.target?.value?.length === 0) {
      setHasTrigger(false);
    }
    onBlur?.(e);
    setValue(e?.target?.value)
  };
  const handleFocus = (e: any) => {
    setHasTrigger(true);
    onFocus?.(e);
  };

  return (
    <>
      {labelPosition === 'outside' && (
        <label className={styles.label}>{label}</label>
      )}
      <div className={`${styles.inputWrapper} ${className}`} style={{ ...styleWrapper, width }}>
        <fieldset className={styles.inputFieldset}>
          <div className={styles.inputTextWrapper}>
            {labelPosition === 'inside' && (
              <legend
                className={`${styles.inputLabelLegend} ${
                  isTriggered || value?.length > 0 ? styles.isTriggered : ''
                }`}
              >
                {label}
              </legend>
            )}
            <input
              id={id}
              type={type}
              ref={inputRef}
              placeholder={placeholder}
              style={style}
              className={styles.inputText}
              {...register(name)}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>
          {labelPosition === 'inline' && <legend className={styles.inputLegend}>{label}</legend>}
        </fieldset>
      </div>
    </>
  );
};

export default TextField;
