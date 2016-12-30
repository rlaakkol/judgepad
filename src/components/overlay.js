import React from 'react';

const Overlay = props =>
  <div id="myNav" className={`overlay ${props.visibility}`}>
    <button className="closebtn" onClick={props.onClose}>&times;</button>
    <div id="overlay-content" className="overlay-content">
      {Math.round(props.total * 10) / 10}
    </div>
  </div>;

Overlay.propTypes = {
  visibility: React.PropTypes.string.isRequired,
  onClose: React.PropTypes.func.isRequired,
  total: React.PropTypes.number.isRequired,
};

export default Overlay;
