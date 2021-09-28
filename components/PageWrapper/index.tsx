import React from 'react';
import './styles.scss';

const PageWrapper = (props: IProps) => {
  const { children } = props;

  return (
    <div className="PageWrapper">
      {children}
    </div>
  );
};

interface IProps {
  children: any,
}

export default PageWrapper;
