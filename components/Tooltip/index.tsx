import React, { ReactElement, useState } from 'react';
import { ReactComponent as TooltipIcon } from '../../assets/tooltip-icon.svg';
import { Link, Button } from '../../components';
import './styles.scss';

const Tooltip = (props: IProps) => {
  const { title, text, learnMoreUrl } = props;
  const [isDetailsVisible, setDetailsVisibility] = useState<boolean>(false);

  return (
    <div className="Tooltip">
      <TooltipIcon
        onClick={() => setDetailsVisibility(true)}
        role="button"
        tabIndex={0}
      />

      {isDetailsVisible && (
        <div className="Tooltip__popup">
          <div
            className="Tooltip__popup__backdrop"
            onClick={() => setDetailsVisibility(false)}
            role="button"
            tabIndex={0}
          />

          <div className="Tooltip__popup__body">
            <h1>{title}</h1>

            <div className="Tooltip__popup__body__text">{text}</div>

            {Boolean(learnMoreUrl) && (
              <Link
                text="Learn more"
                href={learnMoreUrl as string}
              />
            )}

            <Button text="Got it" onClick={() => setDetailsVisibility(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

interface IProps {
  title: string;
  text: string | ReactElement;
  learnMoreUrl?: string;
}

Tooltip.defaultProps = {
  learnMoreUrl: '',
};

export default Tooltip;
