import React from 'react';
import './styles.scss';

const Divider = ({ margin }: IProps) => (
  <div
    className="Divider"
    style={{ margin: margin || 0 }}
  />
);

interface IProps {
  margin: string;
}

export default Divider;
