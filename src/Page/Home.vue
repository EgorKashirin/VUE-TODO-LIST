<template>
  <div id="app">
    <div id="application">
      <h1>App Todo List</h1>
      <router-link
        class="btn-create"
        :to="'/detail/'+lengthitems"
        tag="button"
      >Создать новую заметку</router-link>
      <div class="item_todo" v-for="(tasks, index) in this.dataarray.Tasks" :key="index">
        <h2>{{tasks.title}}</h2>
        <div class="list">
          <ul v-for="(item, indexx) in tasks.Items" :key="indexx">
            <div v-for="(value,indexxx) in item" :key="indexxx">
              <li v-if="id_task == indexxx">{{value}}</li>
              <input
                @click.prevent
                v-if="id_check == indexxx"
                type="checkbox"
                v-model="tasks.Items[indexx][indexxx]"
              />
            </div>
          </ul>
        </div>
        <div class="btn-all-form">
          <button @click="edit(index)" class="btn-edit">Изменить</button>
          <button @click="remove(index)" class="btn-delete">Удалить</button>
        </div>
      </div>
    </div>
    <!-- DIV УДАЛЕНИЯ -->
    <div id="Delete" v-if="isDelete">
      <div class="windows-delete">
        <h2>Вы действительно хотите Удалить Элемент?</h2>
        <div class="btn-all-delete">
          <button @click="yes()" class="btn-edit">Да</button>
          <button @click="no()" class="btn-delete">Нет</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
  data() {
    return {
      dataarray: [],
      id_task: "item_key",
      id_check: "isSuccess",
      lengthitems: 0,
      isDelete: false,
      indexDelete: 0
    };
  },
  beforeCreate() {
    this.$http
      .get("http://localhost:3000/Data")
      .then(response => {
        return response.json();
      })
      .then(dataarray => {
        this.dataarray = dataarray;
        this.lengthitems = Object.keys(this.dataarray.Tasks).length;
      });
  },
  beforeMount() {
    this.$http
      .get("http://localhost:3000/Data")
      .then(response => {
        return response.json();
      })
      .then(dataarray => {
        this.dataarray = dataarray;
        this.lengthitems = Object.keys(this.dataarray.Tasks).length;
      });
  },
  methods: {
    remove(index) {
      this.isDelete = true;
      this.indexDelete = index;
    },
    edit(index) {
      this.$router.push({ name: "Detail", params: { id: index } });
    },
    no() {
      this.isDelete = false;
    },
    yes() {
      this.dataarray.Tasks.splice(this.indexDelete, 1);
      const data = this.dataarray;
      this.$http.post("http://localhost:3000/Data", data);
      this.isDelete = false;
      this.lengthitems--;
    }
  }
};
</script>

<style>
#Delete {
  background: rgba(0, 0, 0, 0.7);
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 2;
}
#application {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  width: 100%;
  height: 100%;
  background-position: top;
  position: absolute;
  z-index: 1;
}
.windows-delete {
  background-color: #fff;
  width: 600px;
  height: 200px;
  margin: auto;
  margin-top: 300px;
  border: 4px solid rgba(20, 227, 227, 0.3);
  border-radius: 10px;
}
.item_todo {
  width: 50%;
  height: auto;
  border: 4px solid rgba(20, 227, 227, 0.3);
  border-radius: 10px;
  margin: 20px auto;
  text-align: center;
}
button {
  width: 150px;
  height: auto;
  font-size: 20px;
  margin-bottom: 20px;
  border-radius: 5%;
  box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.3);
  transition: 0.3s;
}
button:hover {
  cursor: pointer;
  box-shadow: 2px 3px 0 rgba(0, 0, 0, 0);
}
.btn-all-form {
  margin-top: 5%;
}
.btn-all-delete {
  margin-top: 100px;
}
.btn-create {
  width: 300px;
  background-color: rgba(20, 227, 227, 0.5);
}
.btn-create:hover {
  background-color: rgba(20, 227, 227, 1);
}
.btn-edit {
  background-color: rgba(42, 240, 24, 0.5);
}
.btn-edit:hover {
  background-color: rgba(42, 240, 24, 1);
}
.btn-delete {
  margin-left: 20px;
  background-color: rgba(212, 34, 43, 0.5);
}
.btn-delete:hover {
  background-color: rgba(212, 34, 43, 1);
}
.list {
  margin-left: 20%;
}
.list ul {
  display: flex;
}
.list li {
  list-style-type: none;
}
</style>
