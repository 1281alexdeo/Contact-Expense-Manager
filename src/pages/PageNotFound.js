import React from 'react';

const PageNotFound = () => {
  return (
    <div>
      <h1 className="display-4">
        {' '}
        <span className="text-danger">404</span> Page
      </h1>
      <p className="lead">Sorry that page does not exist</p>
    </div>
  );
};
export default PageNotFound;
