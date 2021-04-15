<template>
  <div class="about">
    <h2 class="bracketstuff">{{this.$root.$data.bracketInfo}}</h2>
    <h2 class="error">{{this.error}}</h2>
  <BracketList :teams="teams" />
  <button class="simbutt" ref="sim" @click="simulate" type="simulate">Simulate</button>

  <h2 class="simulating">{{this.simulation}}</h2>
  </div>
</template>

<script>
import BracketList from "../components/BracketList.vue"
export default {
  name: 'Bracket',
  components: {
    BracketList
  },
  data() {
    return {
      // is4: false,
      error: '',
      first: '',
      second: '',
      third: '',
      fourth: '',
      simulation: '',
    }
  },
  computed: {
    teams() {
      // if (this.$root.$data.numTeams == 4) {
      //   this.is4 = true;
      //   // this.$refs.sim.style.display = "block";
      // }
      return this.$root.$data.bracket;
    }
  },
  methods: {
    simulate() {
      if (this.$root.$data.numTeams != 4) {
        this.error = "You must have 4 teams in your bracket to simulate!";
        this.simulation = "";
      } else {
        var result = this.getRndInteger(1, 5);

        console.log(this.$root.$data.bracket);

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


        console.log(this.first.name, this.second.name, this.third.name, this.fourth.name);
        this.simulation = "To go to the NCAA Championship, " + this.first.name + " beat out " +
        this.fourth.name + " while " +
        this.second.name + " beat out " + this.third.name + ". " +
        "In the final game, " + this.first.name + " beat " + this.second.name + " " + this.getRndInteger(70, 75) + "-" +
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

</style>
