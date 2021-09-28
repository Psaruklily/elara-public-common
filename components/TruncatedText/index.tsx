import React, { useState } from 'react';
import Truncate from 'react-truncate-markup';
import './styles.scss';

export default function TruncatedText(props: IProps) {
  const [isTextVisible, toggleTextVisibility] = useState(false);
  const { text } = props;

  return (
    <div className="TruncatedText">
      {!isTextVisible && (
        <Truncate
          lines={7}
          ellipsis={(
            <span>
              ...
              <span
                className="TruncatedText__read-more"
                onClick={() => toggleTextVisibility(true)}
                role="button"
                tabIndex={0}
              >
                Read More
              </span>
            </span>
          )}
        >
          <div>{text}</div>
        </Truncate>
      )}

      {isTextVisible && <div>{text}</div>}
    </div>
  );
}

interface IProps {
  text: string;
}
