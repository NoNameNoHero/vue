<template>
  <div class="home">
    <h3>Задачи в работе</h3>
    <table v-if="filteredInWork.length">
      <thead>
        <tr>
          <th>№</th>
          <th>title</th>
          <th>description</th>
          <th>status</th>
        </tr>
      </thead>
      <tbody>
      <tr v-for="(item, i) in filteredInWork" :key="item.id">
        <td>{{i}}</td>
        <td><input type="text" v-model="item.title" v-bind:disabled="!(!!~check.indexOf(item.id))"/></td>
        <td><input type="text" v-model="item.msg" v-bind:disabled="!(!!~check.indexOf(item.id))"/></td>
        <td class="status" @dblclick="changeStatus({id: item.id})">{{item.status}}</td>
        <td class="btns"><button @click="toggleInp({ id: item.id, title: item.title, msg: item.msg })"> 
          <template v-if="!(!!~check.indexOf(item.id))">
            редактировать
          </template>
          <template v-else>
            принять
          </template>
        </button></td>
        <td class="btns"><button @click="del({id: item.id})">удалить</button></td>
      </tr>
      </tbody>
    </table>
    <p v-else>Список задач пуст!</p>
    <br><br>
    <h3>Завершенные задачи</h3>
    <table v-if="filteredDone.length">
      <thead>
        <tr>
          <th>№</th>
          <th>title</th>
          <th>description</th>
          <th>status</th>
        </tr>
      </thead>
      <tbody>
      <tr v-for="(item, i) in filteredDone" :key="item.id">
        <td>{{i}}</td>
        <td>{{item.title}}</td>
        <td>{{item.msg}}</td>
        <td class="status" @dblclick="changeStatus({id: item.id})">{{item.status}}</td>
        <td class="btns"><button @click="del({id: item.id})">удалить</button></td>
      </tr>
      </tbody>
    </table>
    <p v-else>Завершенных задач пока нет!</p>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      editable: []
    }
  },
  methods: {
    ...mapActions({
      del: 'delPoint',
      changeStatus: 'changeStatus',
      changePoint: 'changePoint'
    }),
    toggleInp ({id, title, msg}) {
      if (!!~this.editable.indexOf(id)) {
        this.editable.forEach((item, i, arr) => { if (item === id) { arr.splice(i, 1) } })
      } else {
        this.editable.push(id)
      }
      this.changePoint({ id, title, msg })
    }
  },
  computed: {
    filteredInWork () {
      return this.$store.state.todoList.filter(item => item.status === 'выполняется')
    },
    filteredDone () {
      return this.$store.state.todoList.filter(item => item.status === 'завершена')
    },
    check () {
      return this.editable
    }
  }
}
</script>

<style>
  p, input, td{
    font-size: 14px;
  }
  table{
    margin: 0 auto;
    width: 1000px;
    border-collapse: collapse;
  }
  table td{
    padding: 5px 10px;
    border: 1px solid black;
  }
  td.btns{
    border: none;
  }
  input:disabled{
    text-align: center;
    border: none;
    background: none;
    color: black;
  }
  .status{
    cursor: pointer;
  }
  .status:hover{
    background-color: #eee;
  }
</style>