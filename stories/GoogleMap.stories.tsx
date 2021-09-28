import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import GoogleMap from '../components/GoogleMap';

export default {
  component: GoogleMap,
  title: 'Components/GoogleMap',
} as ComponentMeta<typeof GoogleMap>;

const Template: ComponentStory<typeof GoogleMap> = (args) => <GoogleMap {...args} />;

export const Default = Template.bind({});