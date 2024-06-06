import { mergeObjects } from '../utils/mergeObjects';
import getDisplayName from './getDisplayName';

const withOverrides = (WrappedComponent, defaultProps = {}, overrides = {}) => {
  const WithOverrides = () => {
    const merged = mergeObjects(defaultProps, overrides);
    return <WrappedComponent {...merged} />;
  };

  WithOverrides.displayName = `WithOverrides(${getDisplayName(
    WrappedComponent
  )})`;

  return WithOverrides;
};

export default withOverrides;
