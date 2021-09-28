import React from 'react';
import { bemHelper } from '../../helpers';
import { Spinner } from '../../components';
import './styles.scss';

export default function Button(props: IProps) {
  const {
    text,
    onClick,
    type,
    size,
    disabled,
    loading,
    theme,
  } = props;

  return (
    <div
      className={bemHelper('Button', {
        text: type === 'text',
        primary: type === 'primary',
        secondary: type === 'secondary',
        regular: size === 'regular',
        small: size === 'small',
        disabled: (disabled || loading) as boolean,
        loading: loading as boolean,
        'application-theme': theme === 'application-theme',
      })}
      onClick={(disabled || loading) ? () => {} : onClick}
      role="button"
      tabIndex={0}
    >
      <span>{text}</span>

      {loading && <Spinner />}
    </div>
  );
}

interface IProps {
  text: string;
  onClick: () => any;
  type?: 'text' | 'primary' | 'secondary';
  size?: 'regular' | 'small';
  disabled?: boolean;
  loading?: boolean;
  theme?: ITheme;
}

type ITheme = 'default-theme' | 'application-theme';

Button.defaultProps = {
  type: 'primary',
  size: 'regular',
  disabled: false,
  loading: false,
  theme: 'default-theme',
};
