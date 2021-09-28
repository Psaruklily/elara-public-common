import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import ContactSupportLink from '../components/ContactSupportLink';

export default {
  component: ContactSupportLink,
  title: 'Components/ContactSupportLink',
} as ComponentMeta<typeof ContactSupportLink>;

const Template: ComponentStory<typeof ContactSupportLink> = (args) => <ContactSupportLink {...args} />;

export const Default = Template.bind({});