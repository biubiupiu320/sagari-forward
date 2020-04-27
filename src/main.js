import Vue from "vue";
import ElementUI from "element-ui";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import moment from 'moment';
import './assets/iconfont/iconfont.css';
import VueParticles from 'vue-particles';

moment.locale('zh-cn');

Vue.filter('dateFrm', (value) => {
    let past = moment(value);
    let now = moment(new Date().getTime());
    let second = now.diff(past, 'second');
    if (second < 60) {
        return now.diff(past, 'second') + '秒前';
    } else if (second >= 60 && second < 3600) {
        return now.diff(past, 'minute') + '分钟前';
    } else if (second >= 3600 && second < 86400) {
        return now.diff(past, 'hour') + '小时前';
    } else if (second >= 86400) {
        if (past.year() === now.year()) {
            return past.format('MM-DD');
        } else {
            return past.format('YYYY-MM-DD');
        }
    }
});

Vue.filter('letter', (value) => {
    let past = moment(value);
    let now = moment(new Date().getTime());
    let second = now.diff(past, 'second');
    if (second < 86400) {
        if (past.day() === now.day()) {
            return past.format('HH:mm');
        } else {
            return past.format('MM-DD HH:mm');
        }
    } else if (second >= 86400) {
        if (past.year() === now.year()) {
            return past.format('MM-DD HH:mm');
        } else {
            return past.format('YYYY-MM-DD HH:mm');
        }
    }
});

Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(VueParticles);

router.beforeEach((to, from, next) => {
    NProgress.start();
    next();
});

router.afterEach(transition => {
    NProgress.done();
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
