import { defineConfig } from 'cypress';

export default defineConfig({
    viewportWidth: 1500,
    viewportHeight: 660,

    defaultCommandTimeout: 10000,
    requestTimeout: 15000,
    responseTimeout: 50000,

    env: {
        laravelUrl: 'http://localhost:8000',
    },
    e2e: {
        baseUrl: 'http://localhost:3000',
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
    },
});
