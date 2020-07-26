import { newE2EPage } from '@stencil/core/testing';

describe('product-tile', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<product-tile></product-tile>');

    const element = await page.find('product-tile');
    expect(element).toHaveClass('hydrated');
  });
});
