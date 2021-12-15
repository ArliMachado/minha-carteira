import { Story, Meta } from '@storybook/react/types-6-0';
import Aside from '.';

export default {
  title: 'Aside',
  component: Aside,
} as Meta;

export const Basic: Story = args => <Aside {...args} />;
