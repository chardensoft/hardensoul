<template>
  <div class="home">
  <TeamsList :teams="teams" />
  </div>
</template>

<script>
import TeamsList from "../components/TeamsList.vue"

export default {
  name: 'Home',
  components: {
    TeamsList
  },
  data() {
    return {
      team1: '',
      team2: '',
      team3: '',
      team4: '',
      first: '',
      second: '',
      third: '',
      fourth: '',
    }
  },
  methods: {
    
  },
  computed: {
    teams() {
      return this.$root.$data.teams;
    }
  },
}

</script>

<style>
.home {
  text-align: center;
}

.team {
  list-style: none;
}
</style>
