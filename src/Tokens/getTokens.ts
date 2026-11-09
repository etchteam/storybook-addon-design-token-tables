export interface Token {
  key: string;
  value: string;
}

export default function getTokens(
  rawTokens: string,
  collection: string,
): Token[] {
  let match;

  const rootRegex = /^(?::root|:scope)[^{]*\{([^}]*)\}\s*$/gm;
  const root = [] as string[];

  while ((match = rootRegex.exec(rawTokens)) !== null) {
    root.push(match[0]);
  }

  const allTokens = root.join('\n');

  // Any whitespace after the colon, so values that Prettier wraps onto
  // the next line still match.
  // eslint-disable-next-line security/detect-non-literal-regexp
  const regex = new RegExp(`--${collection}[a-z0-9-^:]*:\\s+[^;]+;`, 'gs');
  const tokens = [] as Token[];

  while ((match = regex.exec(allTokens ?? '')) !== null) {
    const [key, value] = match[0].replace(';', '').split(/:\s+/);
    tokens.push({
      key: key,
      value: value,
    });
  }

  return tokens;
}
