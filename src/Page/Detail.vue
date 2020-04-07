<template>
    <div id="detail">
        <div v-for="(items,index) in itemarray.Tasks" :key="index">
            <div v-if="id == index" class="list">
                <input class="TitleName" type="text" v-model="items.title">
                <ul v-for="(task, indexx) in items.Items" :key="indexx">
                    <input  type="checkbox" id="checkbox" v-model="items.Items[indexx]"><li>{{indexx}}</li>
                </ul>
            </div>
        </div>
        <router-link class="btn-cancel" to="/" tag="button">Отменить изменения</router-link>
        <button  class="btn-save">Сохранить изменения</button>
    </div>
</template>

<script>
    export default {
        name: 'Detail',
        data() {
            return {
                id: 0,
                itemarray: {},
            }
        },
        mounted() {
    this.$http.get('http://localhost:3000/Data')
          .then(response => {
            return response.json()
          })
          .then(itemarray =>{
             this.itemarray = itemarray
          })
          this.id = this.$route.params.id
  }
    }
</script>

<style scoped>

#detail{
    width: 70%;
    height: 70%;
    border: 4px solid rgba(20, 227, 227, .3);;
    border-radius: 10px;
    margin: 20px auto;
    text-align: center;
}

.TitleName{
    width: 50%;
    height: 30px;
    font-size: 20px;
    border: none;
}

button{
    margin-left: 40px;
    width: 300px;
    height: 30px;
}

.btn-cancel{
  width: 300px;
  background-color: rgba(20, 227, 227, .5);
}
.btn-cancel:hover{
  background-color: rgba(20, 227, 227, 1);
}

.btn-save{
  width: 300px;
  background-color: rgba(42, 240, 24, .5);
}
.btn-save:hover{
  background-color: rgba(42, 240, 24, 1);
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