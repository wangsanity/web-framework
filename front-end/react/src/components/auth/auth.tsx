import { ReactNode, useCallback, useEffect, useState } from 'react';
import { BaseInfoService } from '../../business';
import './auth.scss';

export interface ComAuthProps {
  children?: ReactNode;
}

export const ComAuth = ({ children }: ComAuthProps) => {
  // const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const getAuth = useCallback(() => {
    const authorizationList = BaseInfoService.getAuthorization();
    const exceptionList = [
      'unauthorized',
      'notFound',
      'login',
      'about',
      'home',
      'masterDefault',
    ];
    const routePath = String(window.location.pathname);
    if (
      !authorizationList ||
      (routePath &&
        authorizationList.map((item) => item.routePath).indexOf(routePath) ===
          -1 &&
        exceptionList.indexOf(routePath) === -1)
    ) {
      if (routePath.indexOf('unauthorized') === -1) {
        // navigate(routeNames.unauthorized, { replace: true });
      } else {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getAuth();
  }, [getAuth]);

  return loading ? null : children;
};
