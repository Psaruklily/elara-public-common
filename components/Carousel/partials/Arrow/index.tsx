import React from 'react';
import BackIcon from '../../../../assets/slider-back-icon';
import { bemHelper } from '../../../../helpers';
import './styles.scss';

export default function CarouselArrow(props: IProps) {
  const { direction, onClick, disabled } = props;

  const onArrowClick = () => {
    if (disabled) return;

    onClick?.();
  };

  return (
    <div
      className={bemHelper('CarouselArrow', {
        'direction-left': direction === 'left',
        'direction-right': direction === 'right',
        disabled,
      })}
      onClick={onArrowClick}
      role="button"
      tabIndex={0}
    >
      <BackIcon />
    </div>
  );
};

type IArrowDirection = 'left' | 'right';

interface IProps {
  direction: IArrowDirection;
  onClick: () => void;
  disabled: boolean;
}

