import { createLocalVue } from '@vue/test-utils';
import expect from 'expect';
import Loader from '../src';

describe('Loader', () => {
    let Vue;
    let loader;

    beforeEach(() => {
        Vue = createLocalVue();
        Vue.use(Loader);
        
        loader = Vue.prototype.$loader;
    });

    it('can start loading an item', () => {
        expect(loader.isLoading).toBe(false);
        
        loader.startLoading('test');
        expect(loader.isLoading).toBe(true);
    });

    it('can load multiple items at once', () => {
        expect(loader.isLoading).toBe(false);

        loader.startLoading('test');
        loader.startLoading('test2');
        expect(loader.isLoading).toBe(true);
    });

    it('can stop loading an item', () => {
        expect(loader.isLoading).toBe(false);

        loader.startLoading('test');
        expect(loader.isLoading).toBe(true);

        loader.stopLoading('test');
        expect(loader.isLoading).toBe(false);
    });

    it('can clear all items being loaded', () => {
        loader.startLoading('test');
        loader.startLoading('test2');
        expect(loader.isLoading).toBe(true);

        loader.stopLoading();
        expect(loader.isLoading).toBe(false);
    });

});
