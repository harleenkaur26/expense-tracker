import { useEffect, useState, useLayoutEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from 'config/firebase';

export const useAuth = (redirectNoUser, redirectYesUser) => {
  const navigate = useNavigate();
  const [authState, setAuthState] = useState({
    authenticated: false,
    user: null,
  });

  useEffect(() => {
    const unregisterAuthObserver = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthState({ user, authenticated: !!user });
        if (redirectYesUser) navigate(redirectYesUser);
      } else {
        if (redirectNoUser) navigate(redirectNoUser);
      }
    });
    return () => unregisterAuthObserver();
  }, []);

  const checkRedirect = (NoUser, YesUser) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthState({ user, authenticated: !!user });
        if (YesUser) navigate(YesUser);
      } else {
        if (NoUser) navigate(NoUser);
      }
    });
  };
  return { authState, checkRedirect };
};
