<template>
  <div class="about">
      <div class="mainform">
        <div>
          <span>Название задачи</span>
          <input v-model="title" size='50' type="text" />
        </div>
        <div>
          <span>Описание задачи</span>
          <textarea rows="5" cols='38' v-model="msg" type="text"></textarea>
        </div>
      </div>
      <button @click="addQuery({ title, msg })">Добавить задачу</button>
      <ul class="logs"></ul>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      title: '',
      msg: ''
    }
  },
  methods: {
    ...mapActions({
      add: 'addPoint'
    }),
    addQuery ({ title, msg }) {
      if (!!title && !!msg) {
        this.add( {title, msg} )
        document.querySelector('input').value = ''
        document.querySelector('textarea').value = ''
        let newLi = document.createElement('li')
        newLi.innerHTML = 'Задача: ' + title + '. Успешно добавлена'
        document.querySelector('.logs').appendChild(newLi)
        this.title = this.msg = ''
      } else {
        alert('Some fields ia EMPTY!!!')
      }
    }
  }
}
</script>

<style>
.mainform{
  display: flex;
  flex-direction: column;
}
.mainform span{
  vertical-align: top;
  margin-right: 10px;
}
</style>