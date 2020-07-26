import { newE2EPage } from '@stencil/core/testing';

describe('save-dialog', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<save-dialog></save-dialog>');

    const element = await page.find('save-dialog');
    expect(element).toHaveClass('hydrated');
  });
});
