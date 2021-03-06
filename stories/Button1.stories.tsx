import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Button from '../components/Button';

export default {
  component: Button,
  title: 'Components/Button',
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Default = Template.bind({});
