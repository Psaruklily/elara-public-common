import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import Flatpickr from 'react-flatpickr';
import { ReactComponent as CloseIcon } from '../../assets/close-icon.svg';
import { Button, Input } from '../../components';
import {
  visitsDataService,
  cacheService,
  personDataService,
  deviceManager,
} from '../../services';
import {
  bemHelper,
  getTomorrowDate,
  getTodayMidnightDate,
  removeSpecialCharacters,
  REGEX_ALPHA_AND_SPACES,
} from '../../helpers';
import { IDeviceModel } from '../../interfaces';
import { useSubscription } from '../../hooks';
import { SuccessNotification, ErrorNotification } from './partials';
import './styles.scss';

interface ParamTypes {
  homeId: string;
}

const phoneNumberMask = '999-999-9999';
const cacheKey = 'PERSON';
const defaultPerson = {
  firstName: '',
  lastName: '',
  phoneNumber: '',
  email: '',
};

export default function ScheduleVisitPopup(props: IProps) {
  const { closePopup } = props;
  const cachedValues = cacheService.getValueByKey(cacheKey) || defaultPerson;

  const { homeId } = useParams<ParamTypes>();
  const [visitDate, setVisitDate] = useState<Date>(getTomorrowDate());
  const [firstName, setFirstName] = useState<string>(cachedValues.firstName);
  const [lastName, setLastName] = useState<string>(cachedValues.lastName);
  const [phoneNumber, setPhoneNumber] = useState<string>(cachedValues.phoneNumber);
  const [email, setEmail] = useState<string>(cachedValues.email);
  const [isWaiting, setWaitingState] = useState<boolean>(false);
  const [responseState, setResponseState] = useState<IResponseState>(null);
  const [isValidPerson, setPersonValidationState] = useState<boolean>(true);
  const [device, setDevice] = useState<IDeviceModel | null>(null);

  useSubscription(deviceManager.device, setDevice);

  useEffect(() => {
    if (!isValidPerson) {
      setPersonValidationState(true);
    }
  }, [firstName, lastName, email]);

  const sendRequest = () => {
    setWaitingState(true);

    personDataService.validatePerson({
      firstName,
      lastName,
      email,
    })
      .pipe(
        mergeMap((isPersonValid: boolean) => {
          if (!isPersonValid) return of(false);

          return visitsDataService.scheduleVisit({
            firstName,
            lastName,
            phone: removeSpecialCharacters(phoneNumber),
            email,
            propertyUuid: homeId,
            beginTs: visitDate,
            timezone: Intl?.DateTimeFormat()?.resolvedOptions()?.timeZone,
          });
        }),
      )
      .subscribe({
        next: (result: boolean | any) => {
          if (!result) {
            setWaitingState(false);
            setPersonValidationState(false);

            return;
          }

          cacheService.setValue(cacheKey, {
            firstName,
            lastName,
            phoneNumber,
            email,
          });

          setWaitingState(false);
          setResponseState('success');
        },
        error: () => {
          setWaitingState(false);
          setResponseState('error');
        },
      });
  };

  return (
    <div className="ScheduleVisitPopup">
      <div
        className="ScheduleVisitPopup__backdrop"
        onClick={() => closePopup()}
        role="button"
        tabIndex={0}
      />

      <div
        className={bemHelper('ScheduleVisitPopup__popup', {
          success: responseState === 'success',
          error: responseState === 'error',
        })}
      >
        <div className="ScheduleVisitPopup__popup__title">
          <h2>Schedule a visit</h2>

          <CloseIcon
            onClick={() => closePopup()}
            role="button"
            tabIndex={0}
          />
        </div>

        <div className="ScheduleVisitPopup__popup__content">
          {!responseState && (
            <>
              <div className="ScheduleVisitPopup__popup__datepicker">
                <Flatpickr
                  value={visitDate}
                  onChange={(dates: Date[]) => setVisitDate(dates[0])}
                  options={{
                    enableTime: true,
                    inline: true,
                    mode: 'single',
                    animate: true,
                    dateFormat: 'Z',
                    minDate: getTodayMidnightDate(),
                  }}
                />
              </div>

              <div className="ScheduleVisitPopup__popup__form">
                <div className="ScheduleVisitPopup__popup__form__row">
                  <Input
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                    label="First name"
                    pattern={REGEX_ALPHA_AND_SPACES}
                    required
                  />
                  <Input
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                    label="Last name"
                    pattern={REGEX_ALPHA_AND_SPACES}
                    required
                  />
                </div>
                <Input
                  value={phoneNumber}
                  onChange={(event) => setPhoneNumber(event.target.value)}
                  label="Phone number"
                  mask={phoneNumberMask}
                  maskChar="_"
                  required
                />
                <Input
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  label="Email"
                  errorMessage={isValidPerson ? '' : 'Email address has already been taken'}
                  required
                />

                <span>*Elara provides only self-showings. After you send the visit request, a SMS message will be sent to your phone for next steps.</span>
              </div>
            </>
          )}

          {responseState === 'success' && (
            <SuccessNotification date={visitDate} />
          )}

          {responseState === 'error' && (
            <ErrorNotification />
          )}
        </div>

        <div className="ScheduleVisitPopup__popup-buttons">
          {(device?.isDesktop || responseState) && (
            <Button
              text={!responseState ? 'Cancel' : 'Done'}
              onClick={() => closePopup()}
              type={!responseState ? 'secondary' : 'primary'}
              size="regular"
            />
          )}

          {!responseState && (
            <Button
              text="Send request"
              onClick={sendRequest}
              size="regular"
              disabled={!firstName || !lastName || phoneNumber.length !== phoneNumberMask.length || !email || !isValidPerson}
              loading={isWaiting}
            />
          )}
        </div>
      </div>
    </div>
  );
}

interface IProps {
  closePopup: Function;
}

type IResponseState = 'success' | 'error' | null;
