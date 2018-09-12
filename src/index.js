export default function install(Vue, options = {}) {

    const handler = new Vue({
        data() {
            return {
                loading: []
            }
        },

        computed: {
            isLoading() {
                return this.loading.length > 0;
            }
        },

        methods: {
            start(item) {
                this.loading.push(item);
            },

            stop(item) {
                if (item) {
                    let index = this.loading.indexOf(item);
    
                    if (index != -1) {
                        this.loading.splice(index, 1);
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

        stopLoading(item = null) {
            handler.stop(item);
        },

        get isLoading() {
            return handler.isLoading;
        }
    };

    Object.defineProperty(Vue.prototype, '$loader', {
        get() {
            return Vue.loader;
        }
    });

}
