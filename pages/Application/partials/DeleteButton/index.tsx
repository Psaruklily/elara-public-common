import React from 'react';
import './styles.scss';

const DeleteButton = (props: IProps) => {
  const { onClick } = props;

  return (
    <div
      className="DeleteButton"
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      Delete
    </div>
  );
};

interface IProps {
  onClick: () => void;
}

export default DeleteButton;
