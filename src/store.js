import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentId: 0,
    todoList: []
  },
  mutations: {
    addPoint (state, { title, msg }) {
      state.todoList.push({
        'id': state.currentId++,
        'title': title,
        'msg': msg,
        'status': 'выполняется'
      })
    },
    changePoint (state, { id, title, msg }) {
      state.todoList.forEach(function (item) {
        if (item.id === id) {
          item.title = title
          item.msg = msg
        }
      })
    },
    changeStatus (state, { id }) {
      state.todoList.forEach(function (item, i, arr) {
        if (item.id === id) {
          item.status === 'выполняется' ? item.status = 'завершена' : item.status = 'выполняется'
        }
      })
    },
    delPoint (state, { id }) {
      state.todoList.forEach(function (item, i, arr) {
        if (item.id === id) {
          arr.splice(i, 1)
        }
      })
    }
  },
  actions: {
    addPoint (context, { title, msg }) {

        context.commit('addPoint', { title, msg })
        localStorage.setItem('todoList', JSON.stringify(this.state.todoList))
        localStorage.setItem('todoList - currentId', this.state.currentId)

    },
    delPoint (context, { id }) {
      context.commit('delPoint', { id })
      localStorage.setItem('todoList', JSON.stringify(this.state.todoList))
    },
    changeStatus (context, { id }) {
      context.commit('changeStatus', { id })
      localStorage.setItem('todoList', JSON.stringify(this.state.todoList))
    },
    changePoint (context, { id, title, msg }) {
      context.commit('changePoint', { id, title, msg })
      localStorage.setItem('todoList', JSON.stringify(this.state.todoList))
    }
  }
})
