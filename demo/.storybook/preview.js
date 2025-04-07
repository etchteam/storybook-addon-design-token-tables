
import rawTokens from '../src/tokens.css?raw';

import '../src/tokens.css';

const preview = {
  parameters: {
    designTokenTables: {
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
      tokens: [
        rawTokens,
      ],
    }
  },
};

export default preview;
