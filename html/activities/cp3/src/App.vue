<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">

      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/">Home</router-link>
        </li>
        <li class="nav-item active">
          <router-link to="/Bracket">Brackets</router-link>
        </li>
      </ul>
    </div>

    <h1>March Madness Bracket</h1>

  </nav>
  <router-view />

  <h6 class = "header6 bg-light">All content copyright © Sports Dada<br><br>
  <a class="activities" href="https://github.com/chardensoft/creativeproject3" target="_blank">Github Link</a></h6>

  </div>
</template>

<style>

h1 {
  color: orange;
}

li {
  padding: 10px;
  font-size: 30px;
}

h6 {
  text-align: center;
  padding: 100px;
  margin-top: 50px;
}

a {
  text-align: center;
}

</style>
