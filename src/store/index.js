import Vue from "vue";
import Vuex from 'vuex';

Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        userName: '',
        tableData: [],
        backLogId: 0
    },
    mutations:{
        change(state,newName){
            state.userName = newName;
        },
        addItem(state,newItem){
            state.tableData.push(newItem);
        },
        changeId(state){
            state.backLogId++;
        }
    },
    actions:{
        change({commit},newName){
            commit('change',newName);
        },
        addItem({commit},newItem){
            commit('addItem',newItem)
        },
        changeId({commit}){
            commit('changeId')
        }
    }
})

export default store