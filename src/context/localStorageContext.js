import PropTypes from 'prop-types';
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState
} from 'react';

const LocalStorageContext = createContext();
LocalStorageContext.displayName = 'LocalStorageContext';

const useLocalStorage = () => {
  const context = useContext(LocalStorageContext);
  if (context === undefined) {
    throw new Error(
      'useLocalStorage must be used within a LocalStorageProvider'
    );
  }
  return context;
};

const getLocalStorageItems = prefix =>
  Object.entries(localStorage)
    .filter(([key]) => key.startsWith(prefix))
    .reduce((acc, [key, value]) => {
      const newKey = key.replace(prefix, '');
      acc[newKey] = JSON.parse(value);
      return acc;
    }, {});

const isFunction = obj => !!(obj && obj.constructor && obj.call && obj.apply);

const LocalStorageProvider = ({ children, prefix, items: initialItems }) => {
  const [items, _setItems] = useState(
    getLocalStorageItems(prefix) || initialItems
  );

  const setItems = useCallback(
    obj => {
      _setItems(prev => {
        const next = isFunction(obj) ? obj(prev) : obj;
        Object.entries(next).forEach(([key, value]) => {
          localStorage.setItem(`${prefix}${key}`, JSON.stringify(value));
        });
        return next;
      });
    },
    [prefix]
  );

  const clearItems = useCallback(() => {
    _setItems({});
    Object.keys(items).forEach(key => {
      localStorage.removeItem(`${prefix}${key}`);
    });
  }, [items, prefix]);

  const removeItem = useCallback(
    key => {
      _setItems(prev => {
        const { [key]: _, ...rest } = prev;
        return rest;
      });
      localStorage.removeItem(`${prefix}${key}`);
    },
    [prefix]
  );

  const localStorageProps = useMemo(
    () => ({
      clearItems,
      items,
      removeItem,
      setItems
    }),
    [clearItems, items, removeItem, setItems]
  );

  return (
    <LocalStorageContext.Provider value={localStorageProps}>
      {children}
    </LocalStorageContext.Provider>
  );
};

LocalStorageProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  items: PropTypes.shape({}),
  prefix: PropTypes.string
};

LocalStorageProvider.defaultProps = {
  children: undefined,
  items: {},
  prefix: 'ls_'
};

export { LocalStorageProvider, useLocalStorage };
