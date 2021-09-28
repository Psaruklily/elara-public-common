import React from 'react';
import { ReactComponent as BulletIcon } from '../../assets/list-bullet-icon.svg';
import './styles.scss';

const List = (props: IProps) => {
  const { items } = props;

  return (
    <div className="List">
      {items.map((item: string, index: number) => (
        <div key={index} className="List__item">
          <BulletIcon />

          <span>{item}</span>
        </div>
      ))}
    </div>
  );
};

interface IProps {
  items: string[];
}

export default List;
