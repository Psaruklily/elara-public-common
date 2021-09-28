import React from 'react';
import { get } from 'lodash-es';
import { IApplicant } from '../../../../interfaces';
import { Button, Divider } from '../../../../components';
import { Applicant } from '../../partials';
import './styles.scss';

const MAX_CO_APPLICANTS = 3;

export default function CoApplicants(props: IProps) {
  const { applicants, onFormChange } = props;
  const canAddApplicant = applicants.length < MAX_CO_APPLICANTS;

  const addApplicant = (): void => {
    if (!canAddApplicant) return;

    onFormChange([...applicants, { key: `applicant-${(new Date()).toISOString()}` }], 'secondaries');
  };

  const deleteCoApplicant = (applicantsIndex: number): void => {
    applicants.splice(applicantsIndex, 1);
    onFormChange(applicants, 'secondaries');
  };

  const divider = <Divider margin="30px 0 15px 0" />;

  return (
    <div className="CoApplicants">
      {applicants.map((applicant: IApplicant, index: number) => (
        <div key={applicant.key}>
          {index === 0 && divider}

          <Applicant
            title={`Co-Applicant ${index + 1}`}
            applicant={get(applicants, index)}
            onChange={(value: any, key: string) => onFormChange(value, key, `secondaries.${index}`)}
            onDelete={() => deleteCoApplicant(index)}
          />

          {(index < applicants.length - 1) && divider}
        </div>
      ))}
      {canAddApplicant && (
        <div className="CoApplicants__add-button">
          {!applicants.length && <p>Add Co-applicant if you are applying with anybody else.</p>}

          <Button
            onClick={() => addApplicant()}
            type="secondary"
            text="Add Co-applicant"
            theme="application-theme"
          />
        </div>
      )}
    </div>
  );
}

interface IProps {
  applicants: any[];
  onFormChange: (value: any, key: string, keyPrefix?: string) => void;
}
