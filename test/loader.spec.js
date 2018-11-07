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
        expect(loader.isLoading()).toBe(false);
        
        loader.startLoading('foo');
        expect(loader.isLoading()).toBe(true);
    });

    it('can load multiple items at once', () => {
        expect(loader.isLoading()).toBe(false);

        loader.startLoading('foo');
        loader.startLoading('bar');
        expect(loader.isLoading()).toBe(true);
    });

    it('can find an item being loaded', () => {
        expect(loader.isLoading()).toBe(false);
        
        loader.startLoading('foo');
        expect(loader.isLoading('foo')).toBe(true);
    });

    it('can not find an item load being loaded', () => {
        expect(loader.isLoading()).toBe(false);
        
        loader.startLoading('bar');
        expect(loader.isLoading('foo')).toBe(false);
    });

    it('can match an item being loaded', () => {
        expect(loader.isLoading()).toBe(false);
        
        loader.startLoading('foo*bar');
        expect(loader.isLoading('foo*')).toBe(true);
    });

    it('can stop loading an item', () => {
        expect(loader.isLoading()).toBe(false);

        loader.startLoading('foo');
        expect(loader.isLoading()).toBe(true);

        loader.stopLoading('foo');
        expect(loader.isLoading()).toBe(false);
    });

    it('can stop loading a matched items', () => {
        expect(loader.isLoading()).toBe(false);

        loader.startLoading('foo*bar');
        loader.startLoading('foo*baz');
        expect(loader.isLoading()).toBe(true);

        loader.stopLoading('foo*');
        expect(loader.isLoading()).toBe(false);
    });

    it('can clear all items being loaded', () => {
        loader.startLoading('foo');
        loader.startLoading('bar');
        expect(loader.isLoading()).toBe(true);

        loader.stopLoading();
        expect(loader.isLoading()).toBe(false);
    });

});
