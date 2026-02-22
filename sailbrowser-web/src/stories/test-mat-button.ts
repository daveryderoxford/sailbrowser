import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

/**
 * This story verifies that Material 3 tokens and 
 * your custom global SCSS classes are loading.
 * 
 * What this test tells you:
If Button 1 is white/transparent: Your styles.scss isn't being imported in preview.ts, or the mat.theme mixin isn't targeting the right element.

If Button 2 isn't "Small/Dense": Your .dense-button class isn't being reached.

If Box 3 is invisible or has no background: The Material 3 system variables (the "dictionary") aren't being emitted.
 * 
 */
const meta: Meta = {
   title: 'Tests/Material3Config',
   decorators: [
      moduleMetadata({
         imports: [MatButtonModule, MatIconModule],
      }),
   ],
};

export default meta;
type Story = StoryObj;

export const ThemeCheck: Story = {
   render: () => ({
      template: `
      <div style="padding: 2rem; display: flex; flex-direction: column; gap: 1rem;">
        
        <section>
          <h3>1. Material 3 Primary Color</h3>
          <button mat-flat-button color="primary">
            Should be Azure Blue
          </button>
        </section>

        <section>
          <h3>2. Global Utility Classes</h3>
          <button mat-stroked-button class="dense-button warning">
            Should be Dense & Error Color
          </button>
        </section>

        <section>
          <h3>3. CSS Variable Direct Check</h3>
          <div style="
            background: var(--mat-sys-tertiary-container); 
            color: var(--mat-sys-on-tertiary-container);
            padding: 1rem;
            border-radius: 8px;
          ">
            This box uses <code>--mat-sys-tertiary-container</code>
          </div>
        </section>

      </div>
    `,
   }), 
};