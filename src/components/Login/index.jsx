import React, { useState, useRef } from 'react';
import { auth } from 'config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
//Styles
import styles from './login.module.css';
import { useDispatch } from 'react-redux';
import { useAuth } from 'hooks/useAuth';
import { toast } from 'react-toastify';

export function Login() {
  const { authState, checkRedirect } = useAuth(null, '/');
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const signIn = async (e) => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    e.preventDefault();
    setError('');
    try {
      // signInWithPopup(auth, provider)
      //   .then((userDetails) => {
      //     // const credential =
      //     //   GoogleAuthProvider.credentialFromResult(userDetails);
      //     if (userDetails.user.uid == process.env.REACT_APP_FIREBASE_ADMIN_ID) {
      //       dispatch(setUser());
      //       navigate("/");
      //     } else {
      //       setError("User is not authorized!");
      //     }
      //   })
      //   .catch((err) => console.error(err));
      await signInWithEmailAndPassword( auth,email, password);
      toast.success('Login successful');
      const user = auth.currentUser;
      localStorage.setItem('userID', user.uid);
    } catch (error) {
      toast.error('Wrong email or password');
      console.error(error);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <img className={styles.banner} src='/images/BannerLogin.png' />
        {error ? <p>{error}</p> : undefined}
        <h2 style={{ margin: 0 }}>Welcome</h2>
        <h3>please login to expense tracker</h3>
        <br />
        {/* <button onClick={signIn}>
        <FcGoogle size='1.3rem' /> Sign In With Google
      </button> */}
        <form onSubmit={signIn}>
          <input ref={emailRef} type='text' placeholder='Email' id='Email' />
          <br />
          <input ref={passwordRef} type='password' placeholder='Password' id='password' />
          <br />
          <input type='submit' value='Login' />
        </form>
      </div>
    </>
  );
}
