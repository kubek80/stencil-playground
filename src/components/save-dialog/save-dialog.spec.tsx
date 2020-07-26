import { newSpecPage } from '@stencil/core/testing';
import { SaveDialog } from './save-dialog';

describe('save-dialog', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SaveDialog],
      html: `<save-dialog></save-dialog>`,
    });
    expect(page.root).toEqualHtml(`
      <save-dialog>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </save-dialog>
    `);
  });
});
