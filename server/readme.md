This is a mock server for developing and testing an interview task.

Use `npm run start` to start server.

By default server runs on port `3000` and provides the following routes:

- __GET /packages__ - returns all packages
- __GET /packages/:id__ - returns specified package
- __GET /packages/:id/dependencies__ - returns package dependency IDs

By default server returns a fixed data set. It can be changed to generate random
packages: see comment in "packages.js".