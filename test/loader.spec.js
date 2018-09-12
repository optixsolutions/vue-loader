import { createLocalVue } from '@vue/test-utils';
import expect from 'expect';

import Vuex from 'vuex';
import Loader from '../src';

describe('Loader', () => {
    let Vue;
    let store;

    beforeEach(() => {
        Vue = createLocalVue();
        Vue.use(Vuex);

        store = new Vuex.Store();
    });

    it('throws an error if vuex store is not provided', () => {
        expect(() => Vue.use(Loader)).toThrow();
    });

    it('can start loading an item', () => {
        Vue.use(Loader, { store });

        expect(Vue.prototype.$loader.isLoading()).toBe(false);
        Vue.prototype.$loader.start('test');
        expect(Vue.prototype.$loader.isLoading()).toBe(true);
    });

    it('can load multiple items at once', () => {
        Vue.use(Loader, { store });

        expect(Vue.prototype.$loader.isLoading()).toBe(false);

        Vue.prototype.$loader.start('test');
        Vue.prototype.$loader.start('test2');

        expect(Vue.prototype.$loader.isLoading()).toBe(true);
    });

    it('can stop loading an item', () => {
        Vue.use(Loader, { store });

        expect(Vue.prototype.$loader.isLoading()).toBe(false);

        Vue.prototype.$loader.start('test');

        expect(Vue.prototype.$loader.isLoading()).toBe(true);

        Vue.prototype.$loader.stop('test');

        expect(Vue.prototype.$loader.isLoading()).toBe(false);
    });

    it('can clear all items being loaded', () => {
        Vue.use(Loader, { store });

        Vue.prototype.$loader.start('test');
        Vue.prototype.$loader.start('test2');

        expect(Vue.prototype.$loader.isLoading()).toBe(true);

        Vue.prototype.$loader.clear();

        expect(Vue.prototype.$loader.isLoading()).toBe(false);
    });

});
