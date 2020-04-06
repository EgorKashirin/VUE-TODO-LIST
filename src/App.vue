<template>
  <div id="app">
  <h1>App Todo List</h1>
  <button class="btn-create">Создать новую заметку</button>
  <div class="item_todo" v-for="(tasks, index) in this.dataarray.Tasks" :key="index">
        <button class="btn-edit">Изменить</button>
        <button @click="remove(tasks, index)" class="btn-delete">Удалить</button>
        <h2>{{tasks.title}}</h2>
        <div class="list">
        <ul v-for="(item, indexx) in tasks.Items" :key="indexx">
        <input @click.prevent type="checkbox" id="checkbox" v-model="tasks.Items[indexx]"><li>{{indexx}}</li>
        </ul>
        </div>
  </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  data() {
    return{

    dataarray: []
    }
  },
  mounted() {
    this.$http.get('http://localhost:3000/Data')
          .then(response => {
            return response.json()
          })
          .then(dataarray =>{
             this.dataarray = dataarray
          })
          console.log()
  },
  methods: {
    remove(item, index) {
      this.dataarray.Tasks.splice(index, 1)
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.item_todo{
  width: 600px;
  height: 300px;
  border: 4px solid blue;
  border-radius: 10px;
  margin: 20px auto;
  text-align: center;
}
button{
  width: 150px;
  height: 30px;
  font-size: 20px;
  margin-top: 20px;
}
button:hover{
  cursor: pointer;
}
.btn-create{
  transition: .3s;
  width: 300px;
  background-color: rgba(20, 227, 227, .6);
}
.btn-create:hover{
  background-color: rgba(20, 227, 227, 1);
}
.btn-edit{
  transition: .3s;
  background-color: rgba(42, 240, 24, .6);
}
.btn-edit:hover{
  background-color: rgba(42, 240, 24, 1);
}
.btn-delete{
  transition: .3s;
  margin-left: 20px;
  background-color: rgba(212, 34, 43, .6);
}
.btn-delete:hover{
  background-color: rgba(42, 240, 24, 1);
  background-color: rgba(212, 34, 43, 1);
}
.list{
  margin-left: 35%;
}
.list ul{
  display: flex;
}
.list li{
  list-style-type: none;
}
</style>
