import React from 'react';
import { ISchool } from '../../../../interfaces';
import { ReactComponent as ElementarySchoolIcon } from '../../../../assets/elementary-school-icon.svg';
import { ReactComponent as MiddleSchoolIcon } from '../../../../assets/middle-school-icon.svg';
import { ReactComponent as HighSchoolIcon } from '../../../../assets/high-school-icon.svg';
import './styles.scss';

const schoolIconsMap = {
  high: HighSchoolIcon,
  middle: MiddleSchoolIcon,
  elementary: ElementarySchoolIcon,
};

export default (props: IProps) => {
  const { schools } = props;

  return (
    <div className="SchoolsNearby">
      <h2>Schools nearby</h2>

      <div className="SchoolsNearby__schools">
        {schools.map((school: ISchool, index: number) => {
          const Icon = schoolIconsMap[school.type];

          return (
            <div key={`school-${index}`} className="SchoolsNearby__school">
              <div className="SchoolsNearby__school__type">
                <Icon />
                <span>{`${school.type} school`}</span>
              </div>
              <div className="SchoolsNearby__school__name">
                {school.name}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

interface IProps {
  schools: ISchool[];
}
