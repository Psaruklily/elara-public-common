// // // Button.stories.ts | Button.stories.tsx

// // import React from 'react';

// // import { Meta } from '@storybook/react';

// // import { Button, ButtonProps } from './Button';

// // export default {
// //   title: 'Components/Button',
// //   component: Button,
// // } as Meta;




// import React from 'react';
// import { ComponentStory, ComponentMeta } from '@storybook/react';

// import { Button } from './Button';

// export default {
//   title: 'Example/Button',
//   component: Button,
//   argTypes: {
//     backgroundColor: { control: 'color' },
//   },
// } as ComponentMeta<typeof Button>;

// const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

// export const Button = Template.bind({});
// Button.args = {
//     type: 'primary',
//   size: 'regular',
//   disabled: false,
//   loading: false,
//   theme: 'default-theme'
// };




// import React from 'react';
// import { ComponentStory, ComponentMeta } from '@storybook/react';
// import Link from '../components/Link';
// export default {
//   component: Link,
//   title: 'Components/Link',
// } as ComponentMeta<typeof Link>;
// const Template: ComponentStory<typeof Link> = (args) => <Link {...args} />;
// export const Primary = Template.bind({});
// Primary.args = {
//     text: 'Google Page',
//     underline: false,
//     href: 'https://www.google.com/'
// };
























