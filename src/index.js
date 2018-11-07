import matcher from 'matcher';

export default function install(Vue) {

    const handler = new Vue({
        data() {
            return {
                loading: []
            }
        },

        methods: {
            getIndex(item) {
                return this.loading.indexOf(item);
            },

            start(item) {
                this.loading.push(item);
            },

            check(item) {
                if (typeof item === 'string') {
                    if (item.match(/[\*\!]/)) {
                        return this.loading.filter(load => matcher.isMatch(load, item)).length > 0;
                    }

                    return this.loading.includes(item);
                }

                return this.loading.length > 0;
            },

            stop(item) {
                if (typeof item === 'string') {
                    if (item.match(/[\*\!]/)) {
                        this.loading = this.loading.filter(load => ! matcher.isMatch(load, item));
                    } else {
                        let index = this.getIndex(item);
        
                        if (index !== -1) {
                            this.loading.splice(index, 1);
                        }
                    }
                } else {
                    this.loading = [];
                }
            }
        }
    });

    Vue.loader = {
        startLoading(item) {
            handler.start(item);
        },

        isLoading(item = null) {
            return handler.check(item);
        },

        stopLoading(item = null) {
            handler.stop(item);
        }
    };

    Object.defineProperty(Vue.prototype, '$loader', {
        get() {
            return Vue.loader;
        }
    });

}
