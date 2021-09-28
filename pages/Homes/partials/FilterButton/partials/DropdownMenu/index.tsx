import React, { useState, Fragment } from 'react';
import { Button, Select } from '../../../../../../components';
import {
  IFilterByItem,
  IFilters,
  IObject,
  ISelectOption,
} from '../../../../../../interfaces';
import { useSubscription } from '../../../../../../hooks';
import { filterService } from '../../../../../../services';
import {
  onFilterChange,
  canSave,
  onSave,
  onReset,
  getEdgeValue,
} from '../helpers';
import './styles.scss';

export default function FilterDropdownMenu(props: IProps) {
  const { filterBy, hideMenu } = props;

  const [filtersToUpdate, setFiltersToUpdate] = useState<IObject>({});
  const [filters, setFilters] = useState<IFilters>();
  useSubscription(filterService.getFilters(), setFilters);

  return (
    <div className="FilterDropdownMenu">
      <div className="FilterDropdownMenu__filters">
        {filterBy.map((filterByItem: IFilterByItem) => {
          const options = filterService.getFilterOptionsByKey(filterByItem.key);
          const defaultSelected = filterService.getFilterOptionByKey(filterByItem.key);

          if (!defaultSelected) return null;

          return (
            <Fragment key={`filter-${filterByItem.key}`}>
              <div className="FilterDropdownMenu__filters__label">{filterByItem.label}</div>
              <Select
                options={options}
                defaultSelected={defaultSelected}
                onSelect={(option: ISelectOption) => (
                  onFilterChange(
                    option.value,
                    filterByItem.key,
                    filters as IFilters,
                    filtersToUpdate,
                    setFiltersToUpdate,
                  )
                )}
                min={getEdgeValue(filterByItem.key, 'gte', filtersToUpdate)}
                max={getEdgeValue(filterByItem.key, 'lte', filtersToUpdate)}
              />
            </Fragment>
          );
        })}
      </div>

      <div className="FilterDropdownMenu__buttons-row">
        <Button
          text="Reset"
          onClick={() => onReset(filterBy, hideMenu)}
          type="text"
          size="small"
        />

        <Button
          text="Save"
          onClick={() => onSave(filtersToUpdate, setFiltersToUpdate, hideMenu)}
          size="small"
          disabled={!canSave(filtersToUpdate)}
        />
      </div>
    </div>
  );
}

interface IProps {
  filterBy: IFilterByItem[];
  hideMenu: () => void;
}
