import React from 'react';
// Styles
import styles from './navbar.module.css';
import { BsFillMoonFill, BsFillSunFill, BsCalendarMonth } from 'react-icons/bs';
import { BiLogIn } from 'react-icons/bi';
import { MdOutlinePictureAsPdf } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { changeDark, printOn, setUser } from 'store/slices/uiSlice';
import { useNavigate } from 'react-router-dom';
import { changeFilter } from 'store/slices/expenseSlice';
import { auth } from 'config/firebase';

export function ExpenseNavbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { dark } = useSelector((state) => state.ui);

  const handleThemeChange = () => {
    dispatch(changeDark());
  };

  const generatePdf = () => {
    dispatch(printOn());
  };

  const changeDataFilter = () => {
    dispatch(changeFilter());
  };

  return (
    <div className={styles.container}>
      <div className={styles.circle} title='Switch theme'>
        {dark ? (
          <BsFillSunFill className={styles.button} onClick={handleThemeChange} />
        ) : (
          <BsFillMoonFill className={styles.button} onClick={handleThemeChange} />
        )}
      </div>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <div className={styles.circle} title='Change to year report'>
          <BsCalendarMonth className={styles.button} onClick={changeDataFilter} />
        </div>
        <div className={styles.circle} title='Generate PDF'>
          <MdOutlinePictureAsPdf className={styles.button} onClick={generatePdf} />
        </div>
        <div className={styles.circle} title='Logout'>
          <BiLogIn
            className={styles.button}
            onClick={() => {
              dispatch(setUser(false));
              auth.signOut();
              navigate('/login');
            }}
          />
        </div>
      </div>
      {/* <button onClick={() => dispatch(setFetch())}>Fetch False</button> */}
    </div>
  );
}
