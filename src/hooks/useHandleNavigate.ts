import { NavigateOptions, useNavigate } from 'react-router-dom';

export const useHandleNavigate = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
    window.scrollTo(0, 0);
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  const handleNavigateState = (path: string, options?: NavigateOptions) => {
    navigate(path, options);
    window.scrollTo(0, 0);
  };

  return { handleGoBack, handleNavigate, handleNavigateState };
};
