import { LightMode, Nightlight } from '@emotion-icons/material';
import SlideToggle from './SlideToggle';

export default {
  component: SlideToggle,
  title: 'Components/SlideToggle'
};

const Template = args => <SlideToggle {...args} />;

const defaultProps = {
  onToggleChange: () => {}
};

export const Default = Template.bind({});
Default.args = {
  ...defaultProps
};

export const WithIcons = Template.bind({});
WithIcons.args = {
  ...defaultProps,
  icons: {
    SlideToggleOff: LightMode,
    SlideToggleOn: Nightlight
  }
};
