# Storybook Design Token Tables

A Storybook addon that provides a custom doc block for displaying design tokens in formatted tables within Storybook MDX files.

## Installation

```bash
npm install --save-dev @etchteam/storybook-addon-design-token-tables
# or
yarn add -D @etchteam/storybook-addon-design-token-tables
```

## Usage

This addon provides a `<Tokens>` component that you can use in your Storybook MDX files to display design tokens from your CSS variables in well-formatted tables with previews.

### Step 1: Configure the addon in your Storybook preview file

In your `.storybook/preview.js` (or `.storybook/preview.ts`), configure the addon by providing:

1. Your design tokens CSS (imported as raw text)
2. A mapping of token collection prefixes to display types

```js
// .storybook/preview.js
import rawTokens from '../src/tokens.css?raw';

import '../src/tokens.css'; // Also import your tokens for styling

const preview = {
  parameters: {
    designTokenTables: {
      // Map CSS variable prefixes to display types
      collections: {
        palette: 'color',
        'font-family': 'font-family',
        'font-size': 'font-size',
        'font-weight': 'font-weight',
        'line-height': 'line-height',
        radius: 'radius',
        shadow: 'shadow',
        spacing: 'spacing',
        opacity: 'opacity',
      },
      // Array of CSS with token definitions (as raw strings)
      tokens: [
        rawTokens,
      ],
    }
  },
};

export default preview;
```

### Step 2: Create MDX files for your design tokens

Create MDX files that use the `<Tokens>` component to display your design tokens:

```mdx
// Colors.mdx
import { Meta } from '@storybook/blocks';
import { Tokens } from '@etchteam/storybook-addon-design-token-tables';

<Meta title="Design Tokens/Colors" />

# Colors

<Tokens collection="palette" />
```

The `collection` prop should match one of the token prefixes you configured in your preview file.

## Supported Token Types

The addon supports displaying and previewing various types of design tokens:

- **Colors** - Shows color swatches
- **Font Families** - Shows text previews with the font applied
- **Font Sizes** - Shows text at the specified size
- **Font Weights** - Shows text with the specified weight
- **Line Heights** - Shows text with applied line height
- **Border Radii** - Shows visual preview of border radius
- **Spacing** - Shows visual representation of spacing values
- **Shadows** - Shows preview of shadow effects
- **Opacity** - Shows preview with the specified opacity level

## Token Format

The addon expects tokens to be defined as CSS custom properties in a `:root` selector:

```css
:root {
  --palette-red: #ff0000;
  --spacing-sm: 0.5rem;
  --radius-md: 0.5rem;
  /* etc. */
}
```

The naming pattern should follow: `--collection-name: value;`

## Example

See the `/demo` folder in this repository for a complete working example.

## License

MIT
