import React from 'react';
import { ReactComponent as CheckIcon } from '../../../../assets/check-icon.svg';
import './styles.scss';

export default (props: IProps) => {
  const { comesWith } = props;

  return (
    <div className="HomeComesWith">
      <h2>This home comes with</h2>

      {comesWith.map((item: string, index: number): any => {
        if (!item) return null;

        return (
          <div key={`home-feature-${index}`}>
            <CheckIcon />

            <span className="list-item">{item}</span>
          </div>
        );
      })}
    </div>
  );
};

interface IProps {
  comesWith: Array<string>;
}
