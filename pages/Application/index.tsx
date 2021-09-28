import React, { useState, useEffect } from 'react';
// @ts-ignore
import { LEASE } from 'picket-node-common/constants/elara';
import { useParams } from 'react-router-dom';
import { combineLatest, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { cloneDeep, set, get } from 'lodash-es';
import {
  Button,
  Property,
  Select,
  DatePicker,
  Input,
  Divider,
} from '../../components';
import {
  ISelectOption,
  IVisit,
  IRadioButtonsOption,
  IDeviceModel,
  IApplication,
  IApplicant,
  IDependent,
} from '../../interfaces';
import { useSubscription } from '../../hooks';
import {
  visitsDataService,
  navigationStack,
  deviceManager,
  applicationDataService,
  personDataService,
} from '../../services';
import { currencyFormatter, getTomorrowDate } from '../../helpers';
import { ApplicationDTO } from '../../dtos';
import {
  Applicant,
  CoApplicants,
  Dependents,
  SecurityDeposit,
} from './partials';
import './styles.scss';

const buildLeaseLengthSelectOptions = (options: number[]): ISelectOption[] => (
  options.map((months: number) => ({
    value: months,
    display: `${months} months`,
  }))
);

const buildPetsCountSelectOptions = (): ISelectOption[] => (
  ([0, 1, 2, 3, 4, 5]).map((months: number) => ({
    value: months,
    display: `${months}`,
  }))
);

interface ParamTypes {
  token: string;
  visitId: string;
}

export default function ApplicationPage() {
  const { token, visitId } = useParams<ParamTypes>();
  const [visit, setVisit] = useState<IVisit | null>(null);
  const [form, setForm] = useState<IApplication>({} as IApplication);
  const [isLoading, setLoadingState] = useState<boolean>(false);
  const [device, setDevice] = useState<IDeviceModel | null>(null);

  useSubscription(visitsDataService.getVisit(token, visitId), setVisit);
  useSubscription(deviceManager.device, setDevice);

  const onFormChange = (value: any, key: string, keyPrefix: string = ''): void => {
    const newForm = cloneDeep(form);

    if (keyPrefix.startsWith('secondaries')) {
      set(newForm, `${keyPrefix}.isInvalid`, false);
    }
    set(newForm, `${keyPrefix ? `${keyPrefix}.` : ''}${key}`, value);

    setForm(newForm);
  };

  useEffect(() => {
    if (visit) {
      const { firstName, lastName, email } = visit.person;

      onFormChange({ firstName, lastName, email }, 'primary');
    }
  }, [visit]);

  const canSubmitForm = (): boolean => {
    const {
      leaseLength,
      moveInDate,
      primary = {} as IApplicant,
      secondaries = [] as IApplicant[],
      dependents = [] as IDependent[],
    } = form;

    if (!leaseLength || !moveInDate) return false;

    const emptyApplicant = ([primary, ...secondaries]).find((applicant: IApplicant) => {
      const {
        firstName,
        lastName,
        email,
        incomeVerifier,
        ssn,
        birthday,
        address,
      } = applicant;

      return !firstName
        || !lastName
        || !email
        || !incomeVerifier
        || !ssn
        || !birthday
        || !address?.city
        || !address?.state
        || !address?.street
        || !address?.streetNumber
        || !address?.zip;
    });
    if (emptyApplicant) return false;

    const emptyDependent = dependents.find((dependent: any) => {
      const {
        firstName,
        lastName,
        birthday,
      } = dependent;

      return !firstName || !lastName || !birthday;
    });

    return !emptyDependent;
  };

  const submitForm = (): void => {
    setLoadingState(true);

    const applicationDto = new ApplicationDTO(visit as IVisit, form, token);

    const validationObservables: Observable<boolean>[] = applicationDto.secondaries.map((applicant: IApplicant) => {
      if (applicant.email === applicationDto.primary.email) {
        return of(false);
      }

      return personDataService.validatePerson({
        email: applicant.email,
        firstName: applicant.firstName,
        lastName: applicant.lastName,
      });
    });

    const observable = validationObservables.length ? combineLatest(validationObservables) : of([]);

    observable
      .pipe(
        mergeMap((validationResults: boolean[]) => {
          const invalidApplicants = validationResults
            .reduce((accumulator: number[], current: boolean, index: number) => {
              if (current) return accumulator;

              accumulator.push(index);
              return accumulator;
            }, []);

          if (invalidApplicants.length) {
            const newForm = cloneDeep(form);
            invalidApplicants.forEach((applicantIndex: number) => {
              set(newForm, `secondaries.[${applicantIndex}].isInvalid`, true);
            });
            setForm(newForm);

            return of(null);
          }

          return applicationDataService.createApplication(applicationDto);
        }),
      )
      .subscribe({
        next: (response: any) => {
          setLoadingState(false);

          if (!response) {
            navigationStack.reloadPage();
            return;
          }

          navigationStack.push(`/visited-homes/${token}/${visit?.uuid}/application/success`);
        },
        error: () => {
          setLoadingState(false);
        },
      });
  };

  if (!visit) return null;

  const divider = <Divider margin="30px 0 15px 0" />;

  return (
    <div className="ApplicationPage">
      {device?.isMobile && (
        <div className="ApplicationPage__sub-header">
          <div className="ApplicationPage__sub-header__amount">
            <span>{currencyFormatter.format(visit?.property.price)}</span>
            <span>/mo</span>
          </div>

          <div className="ApplicationPage__sub-header__address">{visit?.property.address}</div>
        </div>
      )}

      <div className="ApplicationPage__content">
        {device?.isDesktop && (
          <h1>Submit Application</h1>
        )}

        <div className="ApplicationPage__container">
          <div className="ApplicationPage__form">
            <div className="ApplicationPage__input-column-group">
              <Select
                label="Preferred Lease Length"
                options={buildLeaseLengthSelectOptions(LEASE.MONTHS)}
                defaultSelected={null}
                onSelect={(option: ISelectOption) => onFormChange(option.value, 'leaseLength')}
                size="big"
                required
              />

              <DatePicker
                label="Preferred Move-in Date"
                value={get(form, 'moveInDate')}
                placeholder="Select"
                onChange={(date: Date) => onFormChange(date, 'moveInDate')}
                minDate={getTomorrowDate()}
                required
              />
            </div>

            {divider}

            <Applicant
              applicant={get(form, 'primary')}
              onChange={(value: any, key: string) => onFormChange(value, key, 'primary')}
              primary
            />

            <CoApplicants
              applicants={get(form, 'secondaries', [])}
              onFormChange={onFormChange}
            />

            {divider}

            <Dependents
              dependents={get(form, 'dependents', [])}
              onFormChange={onFormChange}
            />

            {divider}

            <h2>Pets</h2>

            <div className="ApplicationPage__input-column-group">
              <Select
                label="Cats"
                options={buildPetsCountSelectOptions()}
                defaultSelected={null}
                onSelect={(option: ISelectOption) => onFormChange(option.value, 'pets.cats.quantity')}
                size="big"
              />

              <Select
                label="Dogs"
                options={buildPetsCountSelectOptions()}
                defaultSelected={null}
                onSelect={(option: ISelectOption) => onFormChange(option.value, 'pets.dogs.quantity')}
                size="big"
              />

              <Select
                label="Other"
                options={buildPetsCountSelectOptions()}
                defaultSelected={null}
                onSelect={(option: ISelectOption) => onFormChange(option.value, 'pets.other.quantity')}
                size="big"
              />

              <Input
                label="Notes"
                placeholder="Please specify pet species and counts"
                onChange={(event) => onFormChange(event.target.value, 'pets.other.notes')}
                value={get(form, 'pets.other.notes')}
                textArea
              />
            </div>

            {divider}

            <SecurityDeposit onChange={(option: IRadioButtonsOption) => onFormChange(option.value, 'leaseLock')} />
          </div>

          <div className="ApplicationPage__submit">
            {device?.isDesktop && (
              <Property property={visit.property} />
            )}

            <Button
              onClick={() => submitForm()}
              disabled={!canSubmitForm()}
              loading={isLoading}
              text="Submit Application"
              theme="application-theme"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
