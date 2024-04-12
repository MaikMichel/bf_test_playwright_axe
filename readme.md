# Demo Accessibility Test using playwright and axe

## What is inside
- playwright e2e tests using axe-core
- Application being tested is located here: https://github.com/MaikMichel/apex_a11y_demo_app
- You have to install it on your own or follow the instruction there to rebuild this app on https://apex.oracle.com


## how to test

### Install playwright and dependencies

```bash
  npm install
```

### create file .env to reflect your application credentials with the following content:

```bash

PLWR_USERNAME="<YOUR_USERMANE>"
PLWR_PASSWORD="<YOUR_PASSWORD>"

```

### Run all tests
```bash
  npx playwright test
```

### Run specific test

```bash
  npx playwright test tests/02-home-page.spec.ts
```