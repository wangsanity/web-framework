# Web framework demo

## Project Setup

```sh
npm install
```

### Run in mock data mode, any user name and password can login

```sh
npm run dev
```

### Run in api mode, proxy is configured in proxy.conf.ts file

```sh
npm run dev:server
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint

```sh
npm run lint
```

### Available features

```sh
Only User Settings pages are available
```

### Internationalization

Text constants is under src/contants/texts folder. Only implemented English and Chinese simplify for example.

### Mock data

Http request is proxied to static json files located in folder public/mock-data. 
Please refer to file proxy.conf.js for detail logic.
setTimeout is used to simulate http calls. Please remove it from src/business/base/http-request.service.ts.