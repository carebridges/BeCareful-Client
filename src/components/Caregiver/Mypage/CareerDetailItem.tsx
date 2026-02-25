import React from 'react';
import { CareerDetail } from '@/types/caregiver';

const CareerDetailItem = ({
  details,
  dataKey,
}: {
  details?: CareerDetail[];
  dataKey: keyof CareerDetail;
}) => {
  if (!details?.length) return null;

  const items = [String(details[0][dataKey])];

  if (details.length >= 2) items.push(String(details[1][dataKey]));
  if (details.length > 2) items.push('⋯');

  return (
    <div style={{ display: 'flex', gap: '4px' }}>
      {items.map((text, idx) => (
        <React.Fragment key={idx}>
          {idx > 0 && <div>|</div>}
          <div>{text}</div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default CareerDetailItem;

/*
const formatCareerBase = (
  details: CareerDetail[] | undefined,
  key: keyof CareerDetail,
) => {
  if (!details?.length) return null;
  const items = [<div>{details[0][key]}</div>];
  if (details.length >= 2) {
    items.push(<div>|</div>, <div>{details[1][key]}</div>);
  }
  if (details.length > 2) {
    items.push(<div>|</div>, <div>⋯</div>);
  }
  return items;
};

export const formatCareerInstitution = (d: CareerDetail[] | undefined) =>
  formatCareerBase(d, 'workInstitution');

export const formatCareerYear = (d: CareerDetail[] | undefined) =>
  formatCareerBase(d, 'workYear');
*/
