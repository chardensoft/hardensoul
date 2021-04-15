<template>
  <div>
  <h2>{{this.error}}</h2>
  <div class="wrapper">
    <div class="teams">
    <div class="team" v-for="item in items" :key="item.id">
      <div class="info">
        <h1>{{item.title}}</h1>
      </div>
      <div class="rating">
        <h5>Offensive Rating: {{item.offrating}}</h5>
        <h5>Defensive Rating: {{item.defrating}}</h5>
      </div>
      <button v-on:click="addTo(item)" class="auto">Add to Final Four</button>
    </div>
  </div>
  </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Home',
  data() {
    return {
     items: [],
     error: '',
    }
  },
  created() {
   this.getItems();
  },
  methods: {
    async getItems() {
      try {
        let response = await axios.get("/api/items");
        this.items = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    addTo(team) {
      var notNew = false;
      for (var i = 0; i < this.$root.$data.numTeams; ++i) {
        if (this.$root.$data.bracket[i].title == team.title) {
          notNew = true;
        }
      }
      if (notNew) {
        this.error = "You already selected this team.";
      } else {
        if (this.$root.$data.numTeams < 4) {
          this.$root.$data.bracket.push(team);
          ++this.$root.$data.numTeams;
          this.$root.$data.bracketInfo = "Your Final Four";
          this.error = "";
        } else {
          this.error =  "You can only have four teams. The website will take your four most recent teams.";
          this.$root.$data.bracket.shift();
          this.$root.$data.bracket.push(team);
        }
      }
    },
  }
}
</script>

<style>
h2 {
  color: red;
  margin-top: 10px;
  margin-bottom: -30px;
}

.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.teams {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.team {
  border: 2px solid orange;
  margin: 10px;
  margin-top: 50px;
  width: 200px;
  text-align: center;
}

.info {
  color: #000;
  padding: 10px 10px;
  height: 80px;
}

.info h1 {
  color: blue;
  font-size: 20px;
}

.rating h5 {
  font-size: 12px;
  width: 100px;
}

.info p {
  margin: 0px;
  font-size: 18px;
}


.rating {
  display: flex;
}

button {
  color: black;
  border: 1px solid blue;
  margin-bottom: 5px;
  transition: .15s;
}



button:active {
  color: white;
  background: blue;
}

.auto {
  margin-left: auto;
}
</style>
