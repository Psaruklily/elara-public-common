import React, { useState, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { handleClickOutside, useSubscription } from '../../../../hooks';
import { bemHelper } from '../../../../helpers';
import { sortService } from '../../../../services';
import { ISortCriteria, ISortOption } from '../../../../interfaces';
import { ReactComponent as SortIcon } from '../../../../assets/sort-icon.svg';
import './styles.scss';

export default function SortMenu() {
  const [isMenuVisible, setMenuVisibility] = useState<boolean>(false);
  const [sortCriteria, setSortCriteria] = useState<ISortCriteria>();
  const node = useRef<HTMLDivElement>(null);

  useSubscription<ISortCriteria>(sortService.getSortCriteria(), setSortCriteria);
  handleClickOutside(node, () => setMenuVisibility(false));

  return (
    <div className="SortMenu" ref={node}>
      <div
        className="SortMenu__trigger"
        onClick={() => setMenuVisibility(!isMenuVisible)}
        role="button"
        tabIndex={0}
      >
        <SortIcon />
        <span>Sort</span>
      </div>

      <CSSTransition
        in={isMenuVisible}
        timeout={100}
        classNames="dropdown"
        mountOnEnter
        unmountOnExit
      >
        <div className="SortMenu__menu">
          {sortService.sortOptions.map((sortOption: ISortOption) => (
            <div
              key={`sort-option-${sortOption.value}`}
              className={bemHelper('SortMenu__menu-item', {
                active: sortCriteria === sortOption.value,
              })}
              onClick={() => {
                sortService.setSortCriteria(sortOption.value);
                setMenuVisibility(false);
              }}
              role="button"
              tabIndex={0}
            >
              { sortOption.display }
            </div>
          ))}
        </div>
      </CSSTransition>
    </div>
  );
}
