import { DocsContext } from '@storybook/addon-docs/blocks';
import cx from 'classnames';
import React from 'react';

import styles from './Tokens.module.css';

function getTokens(
  rawTokens: string,
  collection: string,
): { key: string; value: string }[] {
  let match;

  const rootRegex =
    /^(?::root|:scope)(?:\s*,\s*::backdrop)?\s*\{([\s\S]*?)\}[\s\n]*$/gm;
  const root = [] as string[];

  while ((match = rootRegex.exec(rawTokens)) !== null) {
    root.push(match[0]);
  }

  const allTokens = root.join('\n');

  // eslint-disable-next-line security/detect-non-literal-regexp
  const regex = new RegExp(`--${collection}[a-z0-9-^:]*: [^;]+;`, 'gs');
  const tokens = [] as { key: string; value: string }[];

  while ((match = regex.exec(allTokens ?? '')) !== null) {
    const [key, value] = match[0].replace(';', '').split(': ');
    tokens.push({
      key: key,
      value: value,
    });
  }

  return tokens;
}

function getPreviewType(
  token: { key: string; value: string },
  collection: string,
  collections: Record<string, string>,
): string {
  // First try to get the collection by value
  for (const collectionKey in collections) {
    if (token.value.includes(collectionKey)) {
      return collections[collectionKey];
    }
  }
  // If not found, try to get the collection by key
  for (const collectionKey in collections) {
    if (token.key.includes(collectionKey)) {
      return collections[collectionKey];
    }
  }

  if (
    token.value.includes('#') ||
    token.value.includes('rgb') ||
    token.value.includes('transparent')
  ) {
    return 'color';
  }

  if (token.value.includes('px')) {
    return 'spacing';
  }

  return collections[collection] || '';
}

function getContent(previewType: string, hasText: boolean): string {
  if (!previewType) {
    return 'N/A';
  }

  return hasText ? 'Lorem ipsum' : '';
}

export default function Tokens({
  collection,
}: {
  readonly collection: string;
}) {
  const docsContext = React.useContext(DocsContext);
  const addonParameters = docsContext.projectAnnotations.parameters
    ?.designTokenTables || {
    tokens: [],
    collections: {},
  };
  const collections = addonParameters.collections || {};
  const rawTokens = addonParameters.tokens.join('\n');
  const tokens = getTokens(rawTokens, collection);

  return (
    <table className={styles.tokens}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Value</th>
          <th>Preview</th>
        </tr>
      </thead>
      <tbody>
        {tokens?.map((token) => {
          const previewType = getPreviewType(token, collection, collections);

          const hasText = [
            'font-family',
            'font-size',
            'line-height',
            'font-weight',
          ].includes(previewType);

          return (
            <tr key={token.key}>
              <td>{token.key}</td>
              <td>{token.value}</td>
              <td
                className={cx([
                  styles['tokens__preview-cell'],
                  styles[`tokens__preview-cell--${previewType}`],
                ])}
                style={
                  { '--token-preview': token.value } as React.CSSProperties
                }
              >
                <div
                  className={cx([
                    styles['tokens__preview'],
                    styles[`tokens__preview--${previewType}`],
                  ])}
                >
                  {getContent(previewType, hasText)}
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
