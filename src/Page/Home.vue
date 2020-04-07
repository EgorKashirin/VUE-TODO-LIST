<template>
  <div id="app">
  <h1>App Todo List</h1>
  <router-link class="btn-create" to="/detail/0" tag="button">Создать новую заметку</router-link>
  <div class="item_todo" v-for="(tasks, index) in this.dataarray.Tasks" :key="index">
        <h2>{{tasks.title}}</h2>
          <div class="list">
            <ul v-for="(item, indexx) in tasks.Items" :key="indexx">
              <input @click.prevent type="checkbox" id="checkbox" v-model="tasks.Items[indexx]"><li>{{indexx}}</li>
            </ul>
          </div>
        <!--<router-link  
          class="btn-edit" 
          tag="button"
          :to="'/detail/' + index" 
          :key="index"
          >Изменить</router-link> -->
        <button @click="edit(index)" class="btn-edit">Изменить</button>
        <button @click="remove(tasks, index)" class="btn-delete">Удалить</button>
  </div>
  </div>
</template>

<script>

export default {
  name: 'Home',
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
          // console.log("Hello")
  },
  methods: {
    remove(item, index) {
      this.dataarray.Tasks.splice(index, 1)
    },
    edit(index){
      this.$router.push({name:'Detail',params:{id:index}})
    }
  },
  props: {
    index: {
      type: Number,
      default: 0
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
  width: 50%;
  height: 70%;
  border: 4px solid rgba(20, 227, 227, .3);;
  border-radius: 10px;
  margin: 20px auto;
  text-align: center;
}
button{
  width: 150px;
  height: 30px;
  font-size: 20px;
  margin-bottom: 20px;
  border-radius: 5%;
  box-shadow:  2px 2px 0 rgba(0,0,0,.3);
  transition: .3s;
  
}
button:hover{
  cursor: pointer;
  box-shadow:  2px 3px 0 rgba(0,0,0,0);
}
.btn-create{
  width: 300px;
  background-color: rgba(20, 227, 227, .5);
}
.btn-create:hover{
  background-color: rgba(20, 227, 227, 1);
}
.btn-edit{
  background-color: rgba(42, 240, 24, .5);
}
.btn-edit:hover{
  background-color: rgba(42, 240, 24, 1);
}
.btn-delete{
  margin-left: 20px;
  background-color: rgba(212, 34, 43, .5);
}
.btn-delete:hover{
  background-color: rgba(212, 34, 43, 1);
}
.list{
  margin-left: 20%;
}
.list ul{
  display: flex;
}
.list li{
  list-style-type: none;
}
</style>
