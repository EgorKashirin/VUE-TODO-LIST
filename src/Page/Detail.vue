<template>
  <div id="detail">
    <div class="edit-detail">
      <div v-for="(items,index) in originalData.Tasks" :key="index">
        <!--Div для редактирования элемента -->
        <div v-if="id == index && id != lengthitems" class="list">
          <input class="TitleName" type="text" v-model="items.title" />
          <ul v-for="(task, indexx) in items.Items" :key="indexx">
            <div v-for="(value,indexxx) in task" :key="indexxx">
              <li v-if="id_task == indexxx"></li>
              <input v-if="id_task == indexxx" type="text" v-model="items.Items[indexx][indexxx]" />
              <input
                v-if="id_check == indexxx"
                type="checkbox"
                v-model="items.Items[indexx][indexxx]"
              />
            </div>
            <button @click="remove(index,indexx)" class="item-del">Удалить заметку</button>
          </ul>
          <button @click="add(index)" class="item-add">Добавить заметку</button>
          <button @click="delets(index)" class="btn-delete-item">Удалить</button>
        </div>
        <!--Div для нового элемента -->

        <div v-if="index == lengthitems && id == lengthitems" class="list">
          <input
            class="TitleName"
            type="text"
            v-model="items.title"
            placeholder="Введите заголовок"
          />

          <ul v-for="(task, indexx) in items.Items" :key="indexx">
            <div v-for="(value,indexxx) in task" :key="indexxx">
              <li v-if="id_task == indexxx"></li>
              <input
                v-if="id_task == indexxx"
                type="text"
                v-model="items.Items[indexx][indexxx]"
                placeholder="Введите заметку"
              />
              <input
                v-if="id_check == indexxx"
                type="checkbox"
                v-model="items.Items[indexx][indexxx]"
              />
            </div>
            <button @click="remove(index,indexx)" class="item-del">Удалить заметку</button>
          </ul>

          <button @click="add(index)" class="item-add">Добавить заметку</button>
        </div>

        <!-- ------ -->
      </div>
      <button @click="savedata" class="btn-save">Сохранить изменения</button>
      <button @click="back" class="btn-cancel">Отменить редактирование</button>
      <button @click="cancel" class="btn-editing">Отменить внесенное изменение</button>
      <button @click="canceledit" class="btn-editing">Повторить отмененное изменение</button>
    </div>

    <!-- DIV Модальное окно удаления-->
    <div id="Delete" v-if="isDelete">
      <div class="windows-delete">
        <h2>Вы действительно хотите Удалить Элемент?</h2>
        <div class="btn-all-delete">
          <button @click="yes()" class="btn-edit">Да</button>
          <button @click="no()" class="btn-delete-form">Нет</button>
        </div>
      </div>
    </div>
    <!-- ------ -->

    <!-- DIV Модальное окно Редактирование завершено-->
    <div id="Delete" v-if="isEditing">
      <div class="windows-delete">
        <h2>Вы действительно хотите Выйти из режима редактирования?</h2>
        <div class="btn-all-delete">
          <button @click="yesback()" class="btn-edit">Да</button>
          <button @click="noback()" class="btn-delete-form">Нет</button>
        </div>
      </div>
    </div>
    <!-- ------ -->
  </div>
</template>

<script>
export default {
  name: "Detail",
  data() {
    return {
      id: 0, //Id Записи по которой переходим для редактирования
      indexDelete: 0, //Index по которуму удаляем элемент
      isDelete: false, //Показать скрыть модальное окно
      isEditing: false, //Показать скрыть модальное окно
      itemarray: {}, //Массив с Записями
      id_task: "item_key", //Ключ заметки
      id_check: "isSuccess", //Флаг Выполнено не выполнено
      lengthitems: 0, //Id При создании элемента
      originalData: {}, //Buffer Оригинально Data
      buffer: {} //Buffer Изменений
    };
  },
  beforeCreate() {
    this.$http
      .get("http://localhost:3000/Data") //JSON SERVER
      .then(response => {
        return response.json();
      })
      .then(itemarray => {
        this.itemarray = itemarray; //Массив с записями
        this.originalData = this.itemarray; //Нужна для проверки на изменения записей
        this.id = this.$route.params.id; //Присваем ID Элемента Который Редактируем
        this.lengthitems = Object.keys(this.itemarray.Tasks).length; //Длинна массива записей,Требуется для создания нового элемента

        //Если это новый объект то пушим его в массив
        if (this.id == this.lengthitems) {
          let obj = new Object();
          let arr = [];
          obj["title"] = "";
          obj["isSuccess"] = false;
          arr[0] = { item_key: "", isSuccess: false };
          obj["Items"] = arr;
          this.itemarray.Tasks.push(obj);
        }
      });
  },
  methods: {
    //Функция удаления записи в Iteme
    remove(index, indexx) {
      this.itemarray.Tasks[index].Items.splice(indexx, 1);
    },
    delets(index) {
      //Функция вызывает окно (Вы действительно хотите удалить?)
      this.isDelete = true;
      this.indexDelete = index;
    },
    add(index) {
      //Функция добавляет новую заметку в Запись(Создает item)
      let obj = new Object();
      obj["item_key"] = "";
      obj["isSuccess"] = false;
      this.itemarray.Tasks[index].Items.push(obj);
    },
    savedata() {
      //Функция сохраняет все изменения и переводит нас на домашнюю страницу с записями
      const data = this.itemarray;
      const buffer = {};
      this.$http.post("http://localhost:3000/Data", data);
      this.$http.post("http://localhost:3000/Buffer", buffer);
      this.$router.push({ name: "Home" });
    },
    cancel() {
      //Функция отменить внесенное изменение
      this.buffer = this.originalData; //Buffer Хранит изменения
      this.$http.post("http://localhost:3000/Buffer", this.buffer);
      this.$http
        .get("http://localhost:3000/Data")
        .then(response => {
          return response.json();
        })
        .then(originalData => {
          this.originalData = originalData;
        });
    },
    canceledit() {
      //Функция Повторить отмененное изменение
      if (this.buffer == null) {
        this.originalData = this.itemarray;
      } else {
        this.$http
          .get("http://localhost:3000/Buffer")
          .then(response => {
            return response.json();
          })
          .then(buffer => {
            this.originalData = buffer;
          });
      }
    },
    yes() {
      //Функция для модального окна удаления
      this.itemarray.Tasks.splice(this.indexDelete, 1);
      const data = this.itemarray;
      this.$http.post("http://localhost:3000/Data", data);
      this.isDelete = false;
      this.$router.push({ name: "Home" });
    },
    no() {
      //Функция для модального окна удаления
      this.isDelete = false;
    },
    back() {
      //Функция вызывает окно (Вы действительно хотите выйти из режима редактирования?)
      this.isEditing = true;
    },
    yesback() {
      //Функция для модального окна редактирования
      const buffer = {};
      this.$http.post("http://localhost:3000/Buffer", buffer);
      this.$router.push({ name: "Home" });
    },
    noback() {
      //Функция для модального окна редактирования
      this.isEditing = false;
    }
  }
};
</script>

<style scoped>
#Delete {
  background: rgba(0, 0, 0, 0.7);
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 2;
}

.edit-detail {
  width: 70%;
  height: auto;
  border: 4px solid rgba(20, 227, 227, 0.3);
  border-radius: 10px;
  margin: 5% auto 0 15%;
  text-align: center;
  background-position: top;
  position: absolute;
  z-index: 1;
}

#detail {
  width: 70%;
  height: auto;
  border-radius: 10px;
  text-align: center;
}
input {
  outline: none;
  border: 1px solid rgba(20, 227, 227, 0.3);
  border-radius: 10px;
}
.TitleName {
  width: 50%;
  height: 30px;
  font-size: 20px;
  border: none;
  outline: none;
}

button {
  margin-left: 40px;
  width: 300px;
  height: 30px;
  outline: none;
}

.btn-cancel {
  width: 300px;
  background-color: rgba(20, 227, 227, 0.5);
}
.btn-cancel:hover {
  background-color: rgba(20, 227, 227, 1);
}

.btn-save {
  width: 300px;
  background-color: rgba(42, 240, 24, 0.5);
}
.btn-save:hover {
  background-color: rgba(42, 240, 24, 1);
}

.list {
  margin-left: 20%;
}
.list ul {
  display: flex;
  margin-left: auto;
}
.list li {
  list-style-type: none;
}
.item-del {
  width: 100px;
  height: 30px;
  font-size: 10px;
  margin-left: auto;
  margin-right: 30%;
  background-color: rgba(212, 34, 43, 0.5);
}
.item-del:hover {
  background-color: rgba(212, 34, 43, 1);
}
.item-add {
  width: 100px;
  height: 30px;
  font-size: 10px;
  margin-left: auto;
  margin-right: 30%;
  background-color: rgba(20, 227, 227, 0.5);
}
.item-add:hover {
  background-color: rgba(20, 227, 227, 1);
}
.btn-editing {
  font-size: 15px;
  background-color: rgba(223, 247, 91, 0.5);
}
.btn-editing:hover {
  font-size: 15px;
  background-color: rgba(223, 247, 91, 1);
}
.btn-delete-item {
  margin-right: 120px;
  background-color: rgba(212, 34, 43, 0.5);
}
.btn-delete-item:hover {
  background-color: rgba(212, 34, 43, 1);
}
.btn-delete-form {
  margin-left: 40px;
  background-color: rgba(212, 34, 43, 0.5);
}
.btn-delete-form:hover {
  background-color: rgba(212, 34, 43, 1);
}
.btn-all-delete {
  margin-top: 20px;
}
</style>