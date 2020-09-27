<template>
  <div>
    <div class="navbar navbar-dark bg-dark">
      <div class="container">
        <div class="navbar-brand">
          <i class="fab fa-jedi-order"></i>
          <strong>Star Wars</strong>
        </div>
        <router-link  class="navbar-brand"  to="/">
          <i class="fas fa-home"></i>
          <strong>Home</strong>
        </router-link>
      </div>
    </div>
    <div class="container">
      <router-view> </router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
  components: {},
};
</script>

<style>
body {
  background-image: url("assets/background.jpg");
}
strong {
  padding-left: 5px;
}
</style>