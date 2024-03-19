const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: '7avaud',
  e2e: {
    baseUrl: "http://localhost:3000",
    video: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
