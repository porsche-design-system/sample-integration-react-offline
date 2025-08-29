# Porsche Design System for React (Offline Build v3.29.0)

## About

This repository demonstrates how to integrate the Porsche Design System with **React** using a specialized offline build.
This is particularly useful for applications that need to function without an internet connection.

A custom offline build of the Porsche Design System `v3.29.0` npm package is located in `./@porsche-design-system/components-{js|react}`.
This build is designed for offline use and does not retrieve assets from the global CDN (`https://cdn.ui.porsche.com` or `https://cdn.ui.porsche.cn`).

Instead, it expects all assets — such as fonts, icons, and web components — to be served from `${YOUR_BASE_URL}/assets/porsche-design-system/`.

With the upcoming version 4 of the Porsche Design System, a new solution will be available that works out of the box in offline contexts, making this workflow obsolete.

## Integration

### Step 1

Copy the `./@porsche-design-system` folder and its contents from this repository into the **root directory** of **your** [React](https://react.dev/learn/creating-a-react-app#start-from-scratch) project.

### Step 2

Move the assets from `./@porsche-design-system/assets` to `./public/assets/porsche-design-system`, ensuring they are served at `${YOUR_BASE_URL}/assets/porsche-design-system/` when your application is running.

```
mkdir -p ./public/assets/porsche-design-system
mv ./@porsche-design-system/assets/* ./public/assets/porsche-design-system
```

### Step 3

Extend the **scripts** section of your `package.json` file.

```
"scripts": {
  "postinstall": "npm run copy:@porsche-design-system/components-react && npm run copy:@porsche-design-system/components-js",
  "copy:@porsche-design-system/components-react": "rm -rf ./node_modules/@porsche-design-system/components-react && cp -r ./@porsche-design-system/components-react/. ./node_modules/@porsche-design-system/components-react",
  "copy:@porsche-design-system/components-js": "rm -rf ./node_modules/@porsche-design-system/components-js && cp -r ./@porsche-design-system/components-js/. ./node_modules/@porsche-design-system/components-js",
  …
}
```

### Step 3

Add the `@porsche-design-system/components-react` npm package with version `3.29.0`.

```
npm install @porsche-design-system/components-react@3.29.0
```

### Step 4

Wrap your application with the `<PorscheDesignSystemProvider />`, then integrate the Porsche Design System components you need.

For additional information on how to integrate Partials and Tailwind CSS, you can also refer to the [Getting Started](https://designsystem.porsche.com/v3/developing/react/getting-started) section of the official documentation.

```tsx
// src/main.tsx

import { PButton, PFlag, PWordmark, PorscheDesignSystemProvider } from '@porsche-design-system/components-react';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PorscheDesignSystemProvider>
      <PWordmark />
      <PButton icon="add">Some label</PButton>
      <PFlag />
      <App />
    </PorscheDesignSystemProvider>
  </StrictMode>
);
```

### Step 5

Once the web application is built and served, open your browser's developer console.
All Porsche Design System assets should then be loaded from `${YOUR_BASE_URL}`.
