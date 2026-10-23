import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import getTokens from './getTokens.ts';

describe('getTokens', () => {
  it('finds single-line tokens', () => {
    const css = `:root {
  --space-sm: 0.5rem;
  --space-md: 1rem;
}`;

    assert.deepEqual(getTokens(css, 'space'), [
      { key: '--space-sm', value: '0.5rem' },
      { key: '--space-md', value: '1rem' },
    ]);
  });

  it('finds tokens whose value starts on the next line', () => {
    const css = `:root {
  --text-font-family:
    Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica,
    Arial, sans-serif;
  --text-font-size: 1rem;
}`;

    assert.deepEqual(getTokens(css, 'text'), [
      {
        key: '--text-font-family',
        value: `Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica,
    Arial, sans-serif`,
      },
      { key: '--text-font-size', value: '1rem' },
    ]);
  });

  it('finds tokens whose value spans several lines', () => {
    const css = `:root {
  --font-body: 400 1rem/1.5 Inter,
    sans-serif;
  --font-heading: 700 2rem/1.2 Inter, sans-serif;
}`;

    assert.deepEqual(getTokens(css, 'font'), [
      {
        key: '--font-body',
        value: `400 1rem/1.5 Inter,
    sans-serif`,
      },
      { key: '--font-heading', value: '700 2rem/1.2 Inter, sans-serif' },
    ]);
  });

  it('only returns tokens in the requested collection', () => {
    const css = `:root {
  --color-primary: #000;
  --space-sm:
    0.5rem;
}`;

    assert.deepEqual(getTokens(css, 'space'), [
      { key: '--space-sm', value: '0.5rem' },
    ]);
  });
});
