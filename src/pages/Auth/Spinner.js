import React from 'react';

const Spinner = function(props) {
  return (
    <div className="spinner-wrapper d-flex justify-content-center">
      <div className="spinner" />
    </div>
  );
}

export default Spinner;


export function SpinnerButton(props) {
  return (
    <span className="spinner-border spinner-border-sm ml-1" role="status" aria-hidden="true"></span>
  );
}
