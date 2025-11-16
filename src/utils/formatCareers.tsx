import { CareerDetail } from '@/types/Caregiver/mypage';

export const foramtCareerInstitution = (
  careerDetails: CareerDetail[] | undefined,
) => {
  const careers: React.ReactNode[] = [];

  if (!careerDetails || careerDetails.length === 0) {
    return null;
  }

  careers.push(<div>{careerDetails[0].workInstitution}</div>);

  if (careerDetails.length >= 2) {
    careers.push(<div>|</div>);
    careers.push(<div>{careerDetails[1].workInstitution}</div>);
  }

  if (careerDetails.length > 2) {
    careers.push(<div>|</div>);
    careers.push(<div>⋯</div>);
  }

  return careers;
};

export const foramtCareerYear = (careerDetails: CareerDetail[] | undefined) => {
  const careers: React.ReactNode[] = [];

  if (!careerDetails || careerDetails.length === 0) {
    return null;
  }

  careers.push(<div>{careerDetails[0].workYear}</div>);

  if (careerDetails.length >= 2) {
    careers.push(<div>|</div>);
    careers.push(<div>{careerDetails[1].workYear}</div>);
  }

  if (careerDetails.length > 2) {
    careers.push(<div>|</div>);
    careers.push(<div>⋯</div>);
  }

  return careers;
};
