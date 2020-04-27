import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: '',
        unreadNotice: {
            unreadGoodCount: 0,
            unreadFollowCount: 0,
            unreadCommentCount: 0,
            unreadSystemCount: 0
        }
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        clearUser(state) {
            state.user = '';
        },
        setUnreadNotice(state, unreadNotice) {
            state.unreadNotice = unreadNotice;
        }
    },
    getters: {
        isLogin: state => {
            return state.user !== '';
        },
        getUserId: state => {
            return state.user.id;
        },
        getUser: state => {
            return state.user;
        },
        getUnreadNotice: state => {
            return state.unreadNotice;
        }
    },
    actions: {},
    modules: {}
})
