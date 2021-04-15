<template>
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
      <button v-on:click="removeFrom(item)" class="auto">Remove</button>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: 'BracketList',
  methods: {
    removeFrom(team) {
      const index = this.$root.$data.bracket.indexOf(team);
      if (index > -1) {
        this.$root.$data.bracket.splice(index, 1);
        --this.$root.$data.numTeams;
      }
      if (this.$root.$data.bracket.length == 0) {
        this.$root.$data.bracketInfo = "You have 0 selected teams";
      }
    }
  },
}
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
