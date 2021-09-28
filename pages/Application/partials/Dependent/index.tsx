import React from 'react';
// @ts-ignore
import { PERSON } from 'picket-node-common/constants/elara';
import { get } from 'lodash-es';
import { DatePicker, Input, Select } from '../../../../components';
import { DeleteButton } from '../../partials';
import { ISelectOption } from '../../../../interfaces';
import { getTodayMidnightDate, enumToSelectOptions } from '../../../../helpers';
import './styles.scss';

const Dependent = (props: IProps) => {
  const {
    onChange,
    title,
    onDelete,
    dependent,
  } = props;

  return (
    <div className="Dependent">
      <div className="Dependent__title">
        <h2>{title}</h2>

        <DeleteButton onClick={onDelete} />
      </div>

      <div className="Applicant__input-row-group">
        <Input
          label="First Name"
          placeholder="First Name"
          value={get(dependent, 'firstName')}
          onChange={(event) => onChange(event.target.value, 'firstName')}
          required
        />

        <Input
          label="Last Name"
          placeholder="Last Name"
          value={get(dependent, 'lastName')}
          onChange={(event) => onChange(event.target.value, 'lastName')}
          required
        />
      </div>

      <Select
        label="Relation"
        options={enumToSelectOptions(PERSON.DEPENDENT_RELATIONS)}
        defaultSelected={null}
        onSelect={(option: ISelectOption) => onChange(option.value, 'relation')}
        size="big"
        required
      />

      <DatePicker
        label="Date of Birth"
        value={get(dependent, 'birthday')}
        placeholder="Select"
        onChange={(date: Date) => onChange(date, 'birthday')}
        maxDate={getTodayMidnightDate()}
        required
      />
    </div>
  );
};

interface IProps {
  title: string;
  dependent: any;
  onChange: (value: any, key: string) => void;
  onDelete: () => void | null;
}

export default Dependent;
