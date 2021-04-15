<template>
  <div class="about">
    <h2 class="bracketstuff">{{this.$root.$data.bracketInfo}}</h2>
    <h2 class="error">{{this.error}}</h2>
    <div class="wrapper">
      <div class="teams">
      <div class="team" v-for="team in teams" :key="team.id">
        <div class="info">
          <h1>{{team.title}}</h1>
        </div>
        <div class="rating">
          <h5>Offensive Rating: {{team.offrating}}</h5>
          <h5>Defensive Rating: {{team.defrating}}</h5>
        </div>
        <button v-on:click="removeFrom(team)" class="auto">Remove</button>
      </div>
    </div>
    </div>
  <button class="simbutt" ref="sim" @click="simulate" type="simulate">Simulate</button>

  <h2 class="simulating">{{this.simulation}}</h2>
  </div>
</template>

<script>
export default {
  name: 'Bracket',
  data() {
    return {
      // is4: false,
      error: '',
      first: '',
      second: '',
      third: '',
      fourth: '',
      simulation: '',
      teams: [],
    }
  },
  created() {
    this.getTeams();
  },
  methods: {
    getTeams() {
      this.teams = this.$root.$data.bracket;
    },
    removeFrom(team) {
      const index = this.$root.$data.bracket.indexOf(team);
      if (index > -1) {
        this.$root.$data.bracket.splice(index, 1);
        --this.$root.$data.numTeams;
      }
      if (this.$root.$data.bracket.length == 0) {
        this.$root.$data.bracketInfo = "You have 0 selected teams";
      }
    },
    simulate() {
      if (this.$root.$data.numTeams != 4) {
        this.error = "You must have 4 teams in your bracket to simulate!";
        this.simulation = "";
      } else {
        var result = this.getRndInteger(1, 5);

        //console.log(this.$root.$data.bracket);

        if (result == 1) {
          this.first = this.$root.$data.bracket[0];
          this.second = this.$root.$data.bracket[3];
          this.third = this.$root.$data.bracket[2];
          this.fourth = this.$root.$data.bracket[1];
        } else if (result == 2) {
          this.first = this.$root.$data.bracket[1];
          this.second = this.$root.$data.bracket[2];
          this.third = this.$root.$data.bracket[0];
          this.fourth = this.$root.$data.bracket[3];
        } else if (result == 3) {
          this.first = this.$root.$data.bracket[2];
          this.second = this.$root.$data.bracket[1];
          this.third = this.$root.$data.bracket[3];
          this.fourth = this.$root.$data.bracket[0];
        } else if (result == 4) {
          this.first = this.$root.$data.bracket[3];
          this.second = this.$root.$data.bracket[0];
          this.third = this.$root.$data.bracket[1];
          this.fourth = this.$root.$data.bracket[2];
        }


        //console.log(this.first.title, this.second.title, this.third.title, this.fourth.title);
        this.simulation = "To go to the NCAA Championship, " + this.first.title + " beat out " +
        this.fourth.title + " while " +
        this.second.title + " beat out " + this.third.title + ". " +
        "In the final game, " + this.first.title + " beat " + this.second.title + " " + this.getRndInteger(70, 75) + "-" +
        this.getRndInteger(65, 70) + " for the win!";
      }
    },
    getRndInteger(min, max) {
      return Math.floor(Math.random() * (max - min) ) + min;
    }
  }
}
</script>

<style scoped>
h1 {
 text-align: center;
}

.about {
  text-align: center;
}

.simulating {
  color: blue;
  padding: 50px;
  width: 1000px;
  margin: auto;
}

.bracketstuff {
  color: blue;
  margin-top: 20px;
  font-size: 40px;
  margin-bottom: -30px;
}

.error {
  color: red;
  margin-top: 50px;
  margin-bottom: -30px;
}

.simbutt {
  margin-top: 20px;
  margin-bottom: -20px;
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
  width: 180px;
  margin: auto;
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
