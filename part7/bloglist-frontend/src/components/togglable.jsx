import { useState, forwardRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);

  const hideBtn = { display: visible ? 'none' : '' };
  const showBtn = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    };
  });
  return (
    <div className="mb-5 toggle">
      <div style={hideBtn}>
        <button onClick={toggleVisibility} className="btn btn-primary">
          {props.buttonLabel}
        </button>
      </div>
      <div style={showBtn}>
        {props.children}
        <button onClick={toggleVisibility} className="btn btn-outline-danger">
          cancel
        </button>
      </div>
    </div>
  );
});

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

Togglable.displayName = 'Togglable';

export default Togglable;
