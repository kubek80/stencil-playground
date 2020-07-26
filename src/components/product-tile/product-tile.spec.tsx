import { newSpecPage } from '@stencil/core/testing';
import { ProductTile } from './product-tile';

describe('product-tile', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ProductTile],
      html: `<product-tile></product-tile>`,
    });
    expect(page.root).toEqualHtml(`
      <product-tile>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </product-tile>
    `);
  });
});
