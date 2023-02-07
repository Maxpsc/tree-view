import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'tree-view',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      dir: 'docs',
      baseUrl: 'https://maxpsc.github.io/tree-view/',
      serviceWorker: null, // disable service workers
    },
  ],
};
