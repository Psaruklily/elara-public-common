import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Divider from '../components/Divider';

export default {
  component: Divider,
  title: 'Components/Divider',
  parameters: {
    backgrounds: {
      values: [
        { name: 'red', value: '#f00' },
        { name: 'green', value: '#0f0' },
        { name: 'blue', value: '#00f' },
      ],
    },
  },
} as ComponentMeta<typeof Divider>;

const Template: ComponentStory<typeof Divider> = (args) => <Divider {...args} />;

export const Default = Template.bind({});