import React, { ChangeEventHandler, FunctionComponent, SVGProps } from 'react';
import InputMask from 'react-input-mask';
import { generateInputName, generateLabelText, bemHelper } from '../../helpers';
import './styles.scss';

export default function Input(props: IProps) {
  const {
    placeholder,
    label,
    required,
    value,
    onChange,
    onEnterPress,
    mask,
    maskChar,
    inputRef,
    IconComponent,
    datePicker,
    textArea,
    disabled,
    errorMessage,
    pattern,
    minLength,
    maxLength,
  } = props;

  const inputName = label ? generateInputName(label) : '';
  const labelText = label ? generateLabelText(label, required) : '';
  const onKeyDown: any = ((event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      onEnterPress?.();
    }
  });

  return (
    <div
      className={bemHelper('Input', {
        'date-picker': datePicker as boolean,
      })}
    >
      {label && <label htmlFor={inputName}>{labelText}</label>}

      <div className="Input__input-container">
        {!mask && !textArea && (
          <input
            className={bemHelper('Input__input-container__input', {
              'with-icon': Boolean(IconComponent),
              disabled: disabled as boolean,
              error: Boolean(errorMessage),
            })}
            ref={inputRef}
            value={value}
            onChange={(event) => {
              const nextValue = event.target.value;
              if (pattern && nextValue && !(pattern).test(nextValue)) return;

              onChange?.(event);
            }}
            onKeyDown={onKeyDown}
            name={inputName}
            type="text"
            minLength={minLength}
            maxLength={maxLength}
            placeholder={placeholder}
            disabled={disabled}
          />
        )}

        {Boolean(mask) && (
          <InputMask
            className={bemHelper('Input__input-container__input', {
              'with-icon': Boolean(IconComponent),
              disabled: disabled as boolean,
              error: Boolean(errorMessage),
            })}
            mask={mask as string}
            maskChar={maskChar as string}
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
            name={inputName}
            type="text"
            minLength={minLength}
            maxLength={maxLength}
            disabled={disabled}
          />
        )}

        {textArea && (
          <textarea
            className={bemHelper('Input__input-container__input', {
              'text-area': true,
              disabled: disabled as boolean,
              error: Boolean(errorMessage),
            })}
            ref={inputRef}
            value={value}
            onChange={onChange}
            name={inputName}
            placeholder={placeholder}
            disabled={disabled}
            minLength={minLength}
            maxLength={maxLength}
          />
        )}

        {IconComponent && (
          <IconComponent />
        )}
      </div>

      {errorMessage && <p className="Input__error-message">{errorMessage}</p>}
    </div>
  );
}

interface IProps {
  value?: string;
  onChange?: ChangeEventHandler<any>;
  onEnterPress?: Function;
  placeholder?: string;
  label?: string;
  required?: boolean;
  mask?: string;
  maskChar?: string;
  datePicker?: boolean;
  inputRef?: any;
  IconComponent?: FunctionComponent<SVGProps<SVGSVGElement>>;
  textArea?: boolean;
  disabled?: boolean;
  errorMessage?: string;
  pattern?: RegExp;
  minLength?: number;
  maxLength?: number;
}

Input.defaultProps = {
  value: '',
  onChange: () => {},
  onEnterPress: () => {},
  IconComponent: null,
  placeholder: '',
  label: '',
  required: false,
  mask: '',
  maskChar: '',
  datePicker: false,
  inputRef: null,
  textArea: false,
  disabled: false,
  errorMessage: '',
  pattern: undefined,
  minLength: 0,
  maxLength: undefined,
};
