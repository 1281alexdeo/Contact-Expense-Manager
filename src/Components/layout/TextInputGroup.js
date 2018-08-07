import React from 'react';
// import classnames from 'classnames';
import PropTypes from 'prop-types';

const TextInputGroup = ({
  label,
  type,
  name,
  value,
  onChange,
  placeholder,
  error
}) => {
  return (
    <div className="form-group">
      <label htmlFor={label}>{label}</label>
      <input
        type={type}
        className={
          error
            ? 'is-invalid form-control form-control-lg'
            : 'form-control form-control-lg'
        }
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};
//can also use classnames to dynamically add classnames
// classnames('form-control form-control-lg', {
//     'is-invalid': error
// })
TextInputGroup.propsTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  error: PropTypes.string
};

TextInputGroup.defaultProps = {
  type: 'text'
};

export default TextInputGroup;
