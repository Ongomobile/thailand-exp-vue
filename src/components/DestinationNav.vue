<template>
  <nav class="destination-nav">
    <div class="destination-nav-links-wrapper">
      <router-link :to="{ name: 'Home' }" class="elephant logo">
        <img
          src="https://res.cloudinary.com/dnpje4e34/image/upload/v1647989771/chang-logo_zgipn8.png"
          alt="logo"
          class="logo"
        />
      </router-link>
      <h1 class="destination-headline">Thailand Explorer</h1>
      <button @click="reloadPage" class="new-destination-btn">
        New Adventure
      </button>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    reloadPage() {
      window.location.reload()
    }
  }
}
</script>

<style scoped>
.destination-nav {
  display: flex;
}

.destination-nav-links-wrapper {
  display: flex;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  flex: 1;
}

.destination-headline {
  font-size: var(--fs-700);
  text-transform: uppercase;
  color: var(--headline-clr);
}

.logo {
  width: 120px;
  height: 95px;
}

.new-destination-btn {
  background-color: #125ea1;
  text-decoration: none;
  display: inline-block;
  color: #fff;
  border-radius: 1.5rem;
  padding: 0.56rem 1rem;
  width: 10rem;
  text-align: center;
  border: none;
  cursor: pointer;
}

@media (max-width: 768px) {
  .destination-nav-links-wrapper {
    padding-top: 0.8rem;
    display: flex;
    flex-direction: column;
  }
  .destination-headline {
    margin-bottom: 1rem;
  }
}

@media (max-width: 400px) {
  .destination-headline {
    font-size: var(--fs-600);
  }
}
</style>
