// import loaderStore from './store';

export default function install(Vue, options = {}) {
    
    if (! options.hasOwnProperty('store')) {
        throw new Error('Please provide vuex store.');
    }
    
    options.store.registerModule('loader', {
        namespaced: true,

        state: {
            loading: []
        },

        getters: {
            isLoading: state => state.loading.length > 0
        },

        mutations: {
            start(state, item) {
                state.loading.push(item);
            },
        
            stop(state, item) {
                let index = state.loading.indexOf(item);
        
                if (index != -1) {
                    state.loading.splice(index, 1);
                }
            },
        
            clear(state) {
                state.loading = [];
            }
        }
    });

    Vue.loader = {
        start(item) {
            options.store.commit('loader/start', item);
        },

        stop(item) {
            options.store.commit('loader/stop', item);
        },

        isLoading() {
            return options.store.getters['loader/isLoading'];
        },

        clear() {
            options.store.commit('loader/clear');
        }
    };

    Object.defineProperty(Vue.prototype, '$loader', {
        get() {
            return Vue.loader;
        }
    });

}
