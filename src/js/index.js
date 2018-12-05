import '../scss/index.scss';
import '../pug/index.pug';
import Vue from 'vue';
import App from '../vue/App.vue';

// import User from './components/componentOne';

// Init App
// document.addEventListener('DOMContentLoaded', app);

/* if (module.hot) {
    module.hot.accept();
} */

/* const appVm = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue.js 3!',
        rawHtml: '<span style="color: red">Текст должен быть красным.</span>',
        seen1: false,
    },
    created: function () {
        console.log('Значение message: ' + this.message)
    },
    methods: {
        reverseMessage: function () {
            return this.message.split('').reverse().join('')
        }
    },
}); */

(() => new Vue({
    el: '#appVm',
    template: '<App/>',
    components: { App },
}))();

if (module.hot) {
    module.hot.accept();
}
