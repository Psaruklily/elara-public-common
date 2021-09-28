import React, { useState, useEffect } from 'react';
import { isNull } from 'lodash-es';
import { IRadioButtonsOption } from '../../interfaces';
import { ReactComponent as RadioButtonDefaultIcon } from '../../assets/radio-button-default-icon.svg';
import { ReactComponent as RadioButtonSelectedIcon } from '../../assets/radio-button-selected-icon.svg';
import './styles.scss';

export default function RadioButtons(props: IProps) {
  const { options, onChange, defaultSelectedIndex } = props;

  const [selectedOption, selectOption] = useState<IRadioButtonsOption | null>(null);

  const onOptionSelect = (option: IRadioButtonsOption) => {
    onChange(option);
    selectOption(option);
  };

  useEffect(() => {
    if (!isNull(defaultSelectedIndex)) {
      const defaultSelectedOption = isNull(defaultSelectedIndex) ? null : options[defaultSelectedIndex as number];
      onOptionSelect(defaultSelectedOption as IRadioButtonsOption);
    }
  }, []);

  return (
    <div className="RadioButtons">
      {options.map((option: IRadioButtonsOption, index: number) => (
        <div
          key={index}
          className="RadioButtons__option"
          onClick={() => onOptionSelect(option)}
          role="button"
          tabIndex={0}
        >
          {option.value !== selectedOption?.value && (
            <RadioButtonDefaultIcon />
          )}

          {option.value === selectedOption?.value && (
            <RadioButtonSelectedIcon />
          )}

          {option.display}
        </div>
      ))}
    </div>
  );
}

interface IProps {
  options: IRadioButtonsOption[],
  onChange: (option: IRadioButtonsOption) => void;
  defaultSelectedIndex?: number | null,
}

RadioButtons.defaultProps = {
  defaultSelectedIndex: null,
};
