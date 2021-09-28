import React from 'react';
import { bemHelper } from '../../helpers';
import './styles.scss';

const Link = (props: IProps) => {
  const { text, href, underline } = props;

  return (
    <a
      className={bemHelper('Link', { 'with-underline': underline as boolean })}
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      {text}
    </a>
  );
};

interface IProps {
  text: string;
  href: string;
  underline?: boolean;
}

Link.defaultProps = {
  underline: false,
};

export default Link;
