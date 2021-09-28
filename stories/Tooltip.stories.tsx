import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Tooltip from '../components/Tooltip';

export default {
  component: Tooltip,
  title: 'Components/Tooltip',
} as ComponentMeta<typeof Tooltip>;

const Template: ComponentStory<typeof Tooltip> = (args) => <Tooltip {...args} />;

export const Default = Template.bind({});