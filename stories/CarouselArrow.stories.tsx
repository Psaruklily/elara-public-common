import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {CarouselArrow} from '../components/Carousel/partials';

export default {
  component: CarouselArrow,
  title: 'Components/CarouselArrow',
} as ComponentMeta<typeof CarouselArrow>;

const Template: ComponentStory<typeof CarouselArrow> = (args) => <CarouselArrow {...args} />;

export const Default = Template.bind({});

