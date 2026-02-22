// .storybook/preview.ts
import { Preview, componentWrapperDecorator } from '@storybook/angular';
// import '../src/styles.scss';
import '!style-loader!css-loader!sass-loader!../src/styles.scss';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    // This decorator wraps every story in a div and applies the base theme styles.
    // It mimics the app's `body` tag styles without needing to change global CSS.
    // This ensures that Material CSS variables for color and typography are
    // correctly defined and inherited by the components in the Storybook canvas.
    componentWrapperDecorator((story) => `
      <div style="background-color: var(--mat-sys-background);">
        ${story}
      </div>`),
  ]
};

export default preview;
