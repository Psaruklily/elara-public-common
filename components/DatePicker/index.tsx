import React from 'react';
import Flatpickr from 'react-flatpickr';
import { Input } from '../../components';
import { ReactComponent as CalendarIcon } from '../../assets/calendar-icon.svg';

export default function DatePicker(props: IProps) {
  const {
    label,
    required,
    value,
    onChange,
    placeholder,
    minDate,
    maxDate,
  } = props;

  return (
    <div className="DatePicker">
      <Flatpickr
        render={
          (inputProps, ref) => (
            <Input
              label={label}
              required={required}
              inputRef={ref}
              IconComponent={CalendarIcon}
              placeholder={placeholder}
              datePicker
            />
          )
        }
        value={value}
        onChange={(dates: Date[]) => onChange?.(dates[0])}
        options={{
          mode: 'single',
          animate: true,
          dateFormat: 'm/d/Y',
          disableMobile: true,
          minDate,
          maxDate,
        }}
      />
    </div>
  );
}

interface IProps {
  value: Date;
  onChange: (date: Date) => void;
  label?: string;
  required?: boolean;
  placeholder?: string;
  minDate?: Date;
  maxDate?: Date;
}

DatePicker.defaultProps = {
  label: '',
  required: false,
  placeholder: '',
  minDate: undefined,
  maxDate: undefined,
};
