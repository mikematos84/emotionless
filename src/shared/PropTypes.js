import PropTypes from 'prop-types';

export const childrenProp = PropTypes.oneOfType([
  PropTypes.func,
  PropTypes.node,
  PropTypes.arrayOf(PropTypes.node)
]);
