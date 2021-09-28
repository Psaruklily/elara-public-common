import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Carousel from '../components/Carousel';

export default {
  component: Carousel,
  title: 'Components/Carousel',
} as ComponentMeta<typeof Carousel>;

const Template: ComponentStory<typeof Carousel> = (args) => <Carousel {...args} />;

export const Default = Template.bind({});

Default.args = {
    images: ['https://cdn-prod.medicalnewstoday.com/content/images/articles/325/325466/man-walking-dog.jpg',
            'https://images.news18.com/ibnlive/uploads/2021/07/1627377451_nature-1600x900.jpg'
    ],
}

