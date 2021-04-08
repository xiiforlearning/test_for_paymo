<template>
  <nav class="navbar fixed-top navbar-light bg-light">
    <div class="container-fluid">
      <router-link class="nav-link" to="/">
        <img src="@/assets/logo.svg" alt="" style="max-width: 100%; height: auto;">
      </router-link>
      <ul class="navbar-nav flex-row">
        <li class="nav-item px-4">
          <router-link class="nav-link" to="/">Home</router-link>
        </li>
        <li class="nav-item px-4">
          <router-link class="nav-link" to="/register">Register</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>
