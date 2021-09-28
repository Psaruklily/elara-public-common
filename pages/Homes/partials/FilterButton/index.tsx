import React, { useRef, useState } from 'react';
import pluralize from 'pluralize';
import { get } from 'lodash-es';
import { CSSTransition } from 'react-transition-group';
import { handleClickOutside, useSubscription } from '../../../../hooks';
import { bemHelper } from '../../../../helpers';
import { deviceManager, filterService } from '../../../../services';
import filterOptions from '../../../../services/filter/options';
import {
  IFilters,
  IFilterByItem,
  ISelectOption,
  IDeviceModel,
} from '../../../../interfaces';
import { ReactComponent as FilterIcon } from '../../../../assets/filter-icon.svg';
import { FilterDropdownMenu, FilterSideMenu } from './partials';
import './styles.scss';

export default function FilterButton(props: IProps) {
  const { text, filterBy, isRange } = props;

  const node = useRef<HTMLDivElement>(null);
  const [isMenuVisible, setMenuVisibility] = useState<boolean>(false);
  const [filters, setFilters] = useState<IFilters>();
  const countOfAppliedFilters = filterService.countAppliedFilters(filterBy);
  const isAnyFilterApplied = Boolean(countOfAppliedFilters);
  const [device, setDevice] = useState<IDeviceModel | null>(null);

  handleClickOutside(node, () => setMenuVisibility(false));
  useSubscription(filterService.getFilters(), setFilters);
  useSubscription(deviceManager.device, setDevice);

  const getFiltersPreview = (): string => {
    const labels = (filterBy as IFilterByItem[]).map((filterByItem: IFilterByItem) => {
      const value = get(filters, filterByItem.key);
      const filterOption = filterOptions[filterByItem.key].find((option: ISelectOption) => value === option.value);

      return isRange ? filterOption?.display
        : `${filterOption?.display} ${pluralize(filterByItem.label.toLocaleLowerCase(), value)}`;
    });
    const separator = isRange ? ' - ' : ', ';

    return `${labels[0]}${separator}${labels[1]}`;
  };

  return (
    <div className={bemHelper('FilterButton', { active: isAnyFilterApplied })} ref={node}>
      <div
        className="FilterButton__button"
        onClick={() => setMenuVisibility(!isMenuVisible)}
        role="button"
        tabIndex={0}
      >
        {filterBy !== 'all' && (!isAnyFilterApplied || device?.isMobile) && (
          <span>{text}</span>
        )}

        {filterBy !== 'all' && isAnyFilterApplied && !device?.isMobile && (
          <span>{getFiltersPreview()}</span>
        )}

        {filterBy === 'all' && (
          <>
            <FilterIcon />
            <span>{text}</span>
            {isAnyFilterApplied && (
              <span>{`: ${countOfAppliedFilters}`}</span>
            )}
          </>
        )}
      </div>

      {filterBy !== 'all' && (
        <CSSTransition
          in={isMenuVisible}
          timeout={100}
          classNames="dropdown"
          mountOnEnter
          unmountOnExit
        >
          <FilterDropdownMenu
            filterBy={filterBy as IFilterByItem[]}
            hideMenu={() => setMenuVisibility(false)}
          />
        </CSSTransition>
      )}

      {filterBy === 'all' && (
        <CSSTransition
          in={isMenuVisible}
          timeout={400}
          classNames="side-menu"
          mountOnEnter
          unmountOnExit
        >
          <FilterSideMenu hideMenu={() => setMenuVisibility(false)} />
        </CSSTransition>
      )}
    </div>
  );
}

interface IProps {
  text: string;
  filterBy: 'all' | IFilterByItem[];
  isRange?: boolean;
}

FilterButton.defaultProps = {
  isRange: false,
};
