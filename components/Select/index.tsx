import React, { useEffect, useRef, useState } from 'react';
import { isNumber } from 'lodash-es';
import { CSSTransition } from 'react-transition-group';
import { handleClickOutside } from '../../hooks';
import { ISelectOption } from '../../interfaces';
import { ReactComponent as ArrowIcon } from '../../assets/arrow-icon.svg';
import { bemHelper, generateLabelText } from '../../helpers';
import './styles.scss';

export default function Select(props: IProps) {
  const {
    options,
    defaultSelected,
    onSelect,
    required,
    label,
    min,
    max,
    placeholder,
    size,
  } = props;

  const selectNode = useRef<HTMLDivElement | null>(null);
  const [isOptionsMenuVisible, setOptionsVisibility] = useState<boolean>(false);
  const [selectedOption, selectOption] = useState<ISelectOption | null>(null);

  handleClickOutside(selectNode, () => setOptionsVisibility(false));

  const onOptionSelect = (option: ISelectOption) => {
    selectOption(option);
    onSelect(option);
    setOptionsVisibility(false);
  };

  useEffect(() => {
    if (defaultSelected) {
      onOptionSelect(defaultSelected);
    }
  }, []);

  const isOptionDisabled = (option: ISelectOption): boolean => (
    (isNumber(min) && min > 0 && option.value > 0 && option.value < min)
    || (isNumber(max) && max >= 0 && option.value > max)
  );

  return (
    <div
      className={bemHelper('Select', {
        'size-big': size === 'big',
        'with-label': Boolean(label),
      })}
      ref={selectNode}
    >
      {label && <span className="Select__label">{generateLabelText(label, required)}</span>}

      <div
        className="Select__selected-option"
        onClick={() => setOptionsVisibility(!isOptionsMenuVisible)}
        role="button"
        tabIndex={0}
      >
        {selectedOption && <span>{selectedOption.display}</span>}
        {!selectedOption && (
          <span className="Select__selected-option__placeholder">
            {placeholder || 'Select'}
          </span>
        )}
        <ArrowIcon />
      </div>

      <CSSTransition
        in={isOptionsMenuVisible}
        timeout={100}
        classNames="dropdown"
        mountOnEnter
        unmountOnExit
      >
        <div
          className={bemHelper('Select__options-menu', {
            'position-top': (() => {
              const { top, bottom } = selectNode?.current?.getBoundingClientRect() || {};
              const windowHeight = window.innerHeight;

              if (!top || !bottom) return false;

              return top > windowHeight - bottom;
            })(),
          })}
        >
          {options.map((option: ISelectOption, index: number) => {
            const isDisabled = isOptionDisabled(option);

            return (
              <div
                key={`options-menu-item-${index}`}
                className={bemHelper('Select__options-menu__item', {
                  selected: selectedOption?.display === option.display,
                  disabled: isDisabled,
                })}
                onClick={isDisabled ? () => {} : () => onOptionSelect(option)}
                role="button"
                tabIndex={0}
              >
                {option.display}
              </div>
            );
          })}
        </div>
      </CSSTransition>
    </div>
  );
}

interface IProps {
  options: ISelectOption[];
  defaultSelected: ISelectOption | null;
  onSelect: Function;
  required?: boolean;
  label?: string;
  min?: number;
  max?: number;
  placeholder?: string;
  size?: 'regular' | 'big';
}

Select.defaultProps = {
  required: false,
  label: '',
  min: 0,
  max: -1,
  placeholder: '',
  size: 'regular',
};
