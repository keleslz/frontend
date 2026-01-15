import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setupNodeEvents(_on: Cypress.PluginEvents, _config: Cypress.PluginConfigOptions) {
      return {
        fixturesFolder: './cypress/fixtures'
      } as Cypress.PluginConfigOptions
    },
  },
});
