# Vue Loader

A plugin to handle the loading state within your Vue applications

## Installation

```bash
npm install @optix/vue-loader --save
yarn add @optix/vue-loader
```

```javascript
import Vue from 'vue';
import VueLoader from '@optix/vue-loader';

Vue.use(VueLoader);
```

## Usage

Accessing the loader object:

```javascript
// Globally
Vue.loader.start('example');

// On an instance
this.$loader.start('example');
```

### Methods

* start(item)
* stop(item)
* isLoading() // boolean
* clear()

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
