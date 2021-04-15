<template>
  <div>
  <h2>{{this.error}}</h2>
  <div class="wrapper">
    <div class="teams">
    <div class="team" v-for="team in teams" :key="team.id">
      <div class="info">
        <h1>{{team.name}}</h1>
        <p>Rank: {{team.rank}}</p>
      </div>
      <div class="rating">
        <h5>Offensive Rating: {{team.offrtg}}</h5>
        <h5>Defensive Rating: {{team.defrtg}}</h5>
      </div>
      <button v-on:click="addTo(team)" class="auto">Add to Final Four</button>
    </div>
  </div>
  </div>
</div>
</template>

<script>
export default {
  name: "TeamsList",
  props: {
    teams: Array
  },
  data() {
    return {
      error: '',
    }
  },
  methods: {
    addTo(team) {
      var notNew = false;
      for (var i = 0; i < this.$root.$data.numTeams; ++i) {
        if (this.$root.$data.bracket[i].id == team.id) {
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
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
