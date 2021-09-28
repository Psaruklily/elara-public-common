import React from 'react';
import { get } from 'lodash-es';
import { IDependent } from '../../../../interfaces';
import { Button, Divider } from '../../../../components';
import { Dependent } from '../../partials';
import './styles.scss';

const MAX_DEPENDENTS = 3;

export default function Dependents(props: IProps) {
  const { dependents, onFormChange } = props;
  const canAddDependent = dependents.length < MAX_DEPENDENTS;

  const addDependent = (): void => {
    if (!canAddDependent) return;

    onFormChange([...dependents, { key: `dependent-${(new Date()).toISOString()}` }], 'dependents');
  };

  const deleteDependent = (dependentsIndex: number): void => {
    dependents.splice(dependentsIndex, 1);
    onFormChange(dependents, 'dependents');
  };

  return (
    <div className="Dependents">
      {dependents.map((dependent: IDependent, index: number) => (
        <div key={dependent.key}>
          <Dependent
            title={`Dependent ${index + 1}`}
            dependent={get(dependents, index)}
            onDelete={() => deleteDependent(index)}
            onChange={(value: any, key: string) => onFormChange(value, key, `dependents.${index}`)}
          />

          {(index < dependents.length - 1) && <Divider margin="30px 0 15px 0" />}
        </div>
      ))}
      {canAddDependent && (
        <div className="Dependents__add-button">
          {!dependents.length && <p>Add information for your dependent</p>}

          <Button
            onClick={() => addDependent()}
            type="secondary"
            text="Add Dependent"
            theme="application-theme"
          />
        </div>
      )}
    </div>
  );
}

interface IProps {
  dependents: any[];
  onFormChange: (value: any, key: string, keyPrefix?: string) => void;
}
