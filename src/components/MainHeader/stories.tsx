import { Story, Meta } from '@storybook/react/types-6-0';
import MainHeader from '.';

export default {
  title: 'MainHeader',
  component: MainHeader,
} as Meta;

export const Basic: Story = args => <MainHeader {...args} />;
