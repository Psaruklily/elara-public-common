import React from 'react';
// @ts-ignore
import { RESIDENT } from 'picket-node-common/constants/elara';
import { get } from 'lodash-es';
import { DatePicker, Input, Select } from '../../../../components';
import { DeleteButton } from '../../partials';
import { IApplicant, ISelectOption } from '../../../../interfaces';
import {
  getYearsAgoDate,
  enumToSelectOptions,
  REGEX_ALPHA,
  REGEX_ALPHA_AND_SPACES,
  REGEX_NUMERIC,
} from '../../../../helpers';
import './styles.scss';

const Applicant = (props: IProps) => {
  const {
    onChange,
    title,
    onDelete,
    applicant,
    primary,
  } = props;

  return (
    <div className="Applicant">
      <div className="Applicant__title">
        <h2>{title}</h2>

        {onDelete && <DeleteButton onClick={onDelete} />}
      </div>

      <div className="Applicant__input-row-group">
        <Input
          label="First Name"
          placeholder="First Name"
          value={get(applicant, 'firstName')}
          onChange={(event) => onChange(event.target.value, 'firstName')}
          disabled={primary as boolean}
          pattern={REGEX_ALPHA_AND_SPACES}
          required
        />

        <Input
          label="Last Name"
          placeholder="Last Name"
          value={get(applicant, 'lastName')}
          onChange={(event) => onChange(event.target.value, 'lastName')}
          disabled={primary as boolean}
          pattern={REGEX_ALPHA_AND_SPACES}
          required
        />
      </div>

      <Input
        label="Email"
        placeholder="Email"
        value={get(applicant, 'email')}
        onChange={(event) => onChange(event.target.value, 'email')}
        disabled={primary as boolean}
        errorMessage={applicant?.isInvalid ? 'Email address has already been taken' : ''}
        required
      />

      <Input
        label="Employment Income"
        placeholder="Employment Income"
        value={get(applicant, 'employmentIncome')}
        onChange={(event) => onChange(event.target.value, 'employmentIncome')}
        pattern={REGEX_NUMERIC}
      />

      <Select
        label="Preferred way to verify income"
        options={enumToSelectOptions(RESIDENT.INCOME_VERIFIERS)}
        defaultSelected={null}
        onSelect={(option: ISelectOption) => onChange(option.value, 'incomeVerifier')}
        size="big"
        required
      />

      <Input
        label="Social Security Number"
        placeholder="SSN"
        value={get(applicant, 'ssn')}
        onChange={(event) => onChange(event.target.value, 'ssn')}
        maxLength={9}
        pattern={REGEX_NUMERIC}
        required
      />

      <DatePicker
        label="Date of Birth"
        value={get(applicant, 'birthday')}
        placeholder="Select"
        onChange={(date: Date) => onChange(date, 'birthday')}
        maxDate={getYearsAgoDate(15)}
        required
      />

      <div className="Applicant__input-row-group">
        <Input
          label="City"
          placeholder="City"
          value={get(applicant, 'address.city')}
          onChange={(event) => onChange(event.target.value, 'address.city')}
          maxLength={30}
          pattern={REGEX_ALPHA_AND_SPACES}
          required
        />

        <Input
          label="State"
          placeholder="State"
          value={get(applicant, 'address.state')}
          onChange={(event) => onChange(event.target.value, 'address.state')}
          maxLength={2}
          pattern={REGEX_ALPHA}
          required
        />
      </div>

      <div className="Applicant__input-row-group">
        <Input
          label="Street Name"
          placeholder="Street Name"
          value={get(applicant, 'address.street')}
          onChange={(event) => onChange(event.target.value, 'address.street')}
          maxLength={20}
          required
        />

        <Input
          label="Street Number"
          placeholder="Street Number"
          value={get(applicant, 'address.streetNumber')}
          onChange={(event) => onChange(event.target.value, 'address.streetNumber')}
          maxLength={10}
          pattern={REGEX_NUMERIC}
          required
        />
      </div>

      <div className="Applicant__input-row-group">
        <Input
          label="ZIP"
          placeholder="ZIP"
          value={get(applicant, 'address.zip')}
          onChange={(event) => onChange(event.target.value, 'address.zip')}
          maxLength={5}
          pattern={REGEX_NUMERIC}
          required
        />
      </div>
    </div>
  );
};

interface IProps {
  onChange: (value: any, key: string) => void;
  title?: string;
  onDelete?: () => void | null;
  applicant: IApplicant;
  primary?: boolean;
}

Applicant.defaultProps = {
  title: 'Primary Applicant',
  onDelete: null,
  primary: false,
};

export default Applicant;
