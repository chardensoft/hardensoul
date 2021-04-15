<template>
  <div class="all">
    <h2 class="title">Create your teams!</h2>
   <div class="heading">
     <h2>Add a Team</h2>
   </div>
   <div class="add">
     <div class="form">
       <input v-model="title" placeholder="Team Name">
       <input type="number" v-model="offrating" placeholder="Offensive Rating"/>
       <input type="number" v-model="defrating" placeholder="Defensive Rating"/>
       <p></p>
       <button @click="upload">Add</button>
     </div>
   </div>
   <div class="heading">
      <h2>Edit/Delete a Team</h2>
    </div>
    <div class="edit">
      <div class="form">
        <input v-model="findTitle" placeholder="Search">
        <div class="suggestions" v-if="suggestions.length > 0">
          <div class="suggestion" v-for="s in suggestions" :key="s.id" @click="selectItem(s)">{{s.title}}
          </div>
        </div>
      </div>
      <div class="upload" v-if="findItem">
        <input v-model="findItem.title">
        <input type="number" v-model="findItem.offrating"/>
        <input type="number" v-model="findItem.defrating"/>
      </div>
      <div class="actions" v-if="findItem">
        <button @click="deleteItem(findItem)">Delete</button>
         <button @click="editItem(findItem)">Edit</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Create',
  data() {
    return {
      title: "",
      offrating: 0,
      defrating: 0,
      addItem: null,
      items: [],
      findTitle: "",
      findItem: null,
    }
  },
  computed: {
    suggestions() {
      let items = this.items.filter(item => item.title.toLowerCase().startsWith(this.findTitle.toLowerCase()));
      return items.sort((a, b) => a.title > b.title);
    }
  },
  created() {
    this.getItems();
  },
  methods: {
    async upload() {
      try {
        let r1 = await axios.post('/api/items', {
          title: this.title,
          offrating: this.offrating,
          defrating: this.defrating,
        });
        this.addItem = r1.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getItems() {
      try {
        let response = await axios.get("/api/items");
        this.items = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    selectItem(item) {
      this.findTitle = "";
      this.findItem = item;
    },
    async deleteItem(item) {
     try {
       await axios.delete("/api/items/" + item._id);
       this.findItem = null;
       this.getItems();
       return true;
     } catch (error) {
       console.log(error);
     }
   },
   async editItem(item) {
      try {
        await axios.put("/api/items/" + item._id, {
          title: this.findItem.title,
          offrating: this.findItem.offrating,
          defrating: this.findItem.defrating,
        });
        this.findItem = null;
        this.getItems();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  },

}
</script>

<style scoped>

.all {
  width: 400px;
  margin: auto;
}

.title {
  font-size: 40px;
}

.heading {
  display: flex;
  margin-bottom: 20px;
  margin-top: 20px;
}

h2 {
  margin-top: 8px;
  margin-left: 10px;
  color: blue;
  font-size: 30px;
}

.add,
.edit {
  display: flex;
}

.circle {
  border-radius: 50%;
  width: 18px;
  height: 18px;
  padding: 8px;
  background: #333;
  color: #fff;
  text-align: center
}

/* Form */
input,
textarea,
select,
button {
  font-family: 'Montserrat', sans-serif;
  font-size: 1em;
  margin-top: 8px;
  margin-left: 10px;
}

textarea {
  display: block;
  margin-top: 10px;
}

.form {
  margin-right: 50px;
}

/* Suggestions */
.suggestions {
  width: 200px;
  border: 1px solid #ccc;
}

.suggestion {
  min-height: 20px;
}

.suggestion:hover {
  background-color: #5BDEFF;
  color: #fff;
}

</style>
