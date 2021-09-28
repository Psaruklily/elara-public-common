import React from 'react';
import { ReactComponent as PageNotFoundIcon } from '../../assets/page-not-found-icon.svg';
import { Button, Footer } from '../../components';
import { navigationStack } from '../../services';
import './styles.scss';

export default () => (
  <div className="NotFoundPage">
    <div className="NotFoundPage__content">
      <PageNotFoundIcon />

      <h1 className="NotFoundPage__title">Page Not Found</h1>

      <div className="NotFoundPage__message">
        <span>It looks like that page doesn’t exist.</span>
        <span>Please check the URL or return to our listings page.</span>
      </div>

      <Button
        text="View Listings"
        onClick={() => navigationStack.push('/')}
        size="small"
      />
    </div>

    <Footer />
  </div>
);
