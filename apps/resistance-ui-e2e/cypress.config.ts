import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';

import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: 'src',
      bundler: 'vite',
      webServerCommands: {
        default: 'nx run resistance-ui:serve',
        production: 'nx run resistance-ui:preview',
      },
      ciWebServerCommand: 'nx run resistance-ui:serve-static',
    }),
    baseUrl: 'http://localhost:4200',
  },
});
