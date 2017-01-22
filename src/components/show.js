import React from 'react';

const ShowTotal = props =>
  <div>
    <div id="overlay-content" className="overlay-content">
      {Math.round(props.total * 10) / 10}
    </div>
    <button
      className="btn btn-primary"
      onClick={props.toggleSubmitConfirmation}
    >
      Submit
    </button>
  </div>;

export default ShowTotal;
