import React, { Fragment, useState } from 'react';
import { rangeRight } from 'lodash-es';
import { bemHelper } from '../../../../../../helpers';
import { ReactComponent as CloseIcon } from '../../../../../../assets/close-icon.svg';
import {
  IFilters,
  IObject,
  IRange,
  ISelectOption,
} from '../../../../../../interfaces';
import { Button, Select } from '../../../../../../components';
import { filterService, propertiesDataService } from '../../../../../../services';
import { useSubscription } from '../../../../../../hooks';
import {
  onFilterChange,
  canSave,
  onSave,
  onReset,
  getEdgeValue,
} from '../helpers';
import menuConfig from './config';
import './styles.scss';

export default function FilterSideMenu(props: IProps) {
  const { hideMenu } = props;

  const [filtersToUpdate, setFiltersToUpdate] = useState<IObject>({});
  const [filters, setFilters] = useState<IFilters>();
  const [buildYearRange, setBuildYearRange] = useState<IRange>({});
  useSubscription(filterService.getFilters(), setFilters);
  useSubscription(propertiesDataService.getBuildYearRange(), setBuildYearRange);

  return (
    <div className="SideMenu">
      <div
        className="SideMenu__backdrop"
        onClick={hideMenu}
        role="button"
        tabIndex={0}
      />

      <div className="SideMenu__menu">
        <div className="SideMenu__menu__title">
          <h2>Filters</h2>
          <CloseIcon
            onClick={hideMenu}
            role="button"
            tabIndex={0}
          />
        </div>

        <div className="SideMenu__menu-list">
          {menuConfig.map((menuItem: IMenuItem) => (
            <div
              key={`menu-item-${menuItem.label}`}
              className="SideMenu__menu-item"
            >
              <span className="SideMenu__menu-item__label">{menuItem.label}</span>
              <div
                className={bemHelper('SideMenu__menu-item__selects', {
                  'full-width': menuItem.keys[0] === 'propertyType',
                })}
              >
                {menuItem.keys.map((key: string, index: number) => {
                  let options = filterService.getFilterOptionsByKey(key);
                  if ((buildYearRange.gte && buildYearRange.lte) && (key === 'built.gte' || key === 'built.lte')) {
                    options = [
                      ...options,
                      ...rangeRight(buildYearRange.gte, buildYearRange.lte + 1).map((year: number) => ({
                        value: year,
                        display: `${year}`,
                      })),
                    ];
                  }

                  const defaultSelected = filterService.getFilterOptionByKey(key, options);

                  if (!defaultSelected) return;

                  return (
                    <Fragment key={key}>
                      {index === 1 && (<span>to</span>)}
                      <Select
                        options={options}
                        defaultSelected={defaultSelected}
                        onSelect={(option: ISelectOption) => (
                          onFilterChange(
                            option.value,
                            key,
                            filters as IFilters,
                            filtersToUpdate,
                            setFiltersToUpdate,
                          )
                        )}
                        min={getEdgeValue(key, 'gte', filtersToUpdate)}
                        max={getEdgeValue(key, 'lte', filtersToUpdate)}
                      />
                    </Fragment>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="SideMenu__menu-buttons">
          <Button
            text="Reset"
            onClick={() => onReset('all', hideMenu)}
            type="text"
            size="regular"
          />

          <Button
            text="Apply Filters"
            onClick={() => onSave(filtersToUpdate, setFiltersToUpdate, hideMenu)}
            size="regular"
            disabled={!canSave(filtersToUpdate)}
          />
        </div>
      </div>
    </div>
  );
}

interface IProps {
  hideMenu: () => void;
}

interface IMenuItem {
  label: string;
  keys: string[];
}
