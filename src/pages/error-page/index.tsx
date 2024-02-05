import React from 'react';
import style from './index.module.scss';
import logo from '@assets/scrubbers-logo.png';
import bg from '@assets/bgtop.png';
import '../../App.css';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';

const ErrorPage: React.FC = () => {
  return (
    <div className={style.errorPage}>
      <Helmet>
        <title>Not Found</title>
        </Helmet>
      <div className={style.errorPageNav}>
        <img src={logo} alt="scrubbers logo"></img>
      </div>
      <div className={style.errorPageRow1}>
        <h1>404</h1>
        <h2>Not Found!</h2>
      </div>
      <div className={style.errorPageRow2}>
        <h3>Sorry!</h3>
        <p>Something went wrong, we suggest you go back home.</p>
        <Link to={'/'} className={style.errorPageRow2Btn}>
          Go Home
        </Link>
      </div>
      <div className={style.errorPageRow3}>
        <img src={bg} alt="scrubbers logo"></img>
      </div>
    </div>

  );
};

export default ErrorPage;
