import { LightMode, Nightlight } from '@emotion-icons/material';
import React, { useEffect } from 'react';
import SlideToggle from './components/SlideToggle/SlideToggle';
import { useLocalStorage } from './context/localStorageContext';
import {
  THEME_EVENTS,
  dispatch,
  subscribe,
  unsubscribe
} from './themes/events';

const ThemeChecker = () => {
  const { items, setItems } = useLocalStorage();

  const handleToggleChange = isOn => {
    setItems(prev => ({ ...prev, darkMode: isOn }));
    dispatch(THEME_EVENTS.ON_DARK_MODE_CHANGE, { darkMode: isOn });
  };

  useEffect(() => {
    const onChange = ({ detail: { darkMode } }) => {
      const [html] = document.getElementsByTagName('html');
      html.dataset.darkMode = darkMode;
      setItems(prev => ({ ...prev, darkMode }));
    };
    subscribe(THEME_EVENTS.ON_DARK_MODE_CHANGE, onChange);
    return () => unsubscribe(THEME_EVENTS.ON_DARK_MODE_CHANGE, onChange);
  }, [setItems]);

  return (
    <SlideToggle
      onToggleChange={handleToggleChange}
      isOn={items?.darkMode}
      icons={{
        SlideToggleOff: LightMode,
        SlideToggleOn: Nightlight
      }}
    />
  );
};

export default {
  component: ThemeChecker,
  title: 'ThemeChecker'
};

const Template = args => <ThemeChecker {...args} />;

export const Default = Template.bind({});
Default.args = {};
