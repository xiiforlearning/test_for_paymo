<template>
  <div class="home-page">
    <div class="blurred-box">
      <div class="user-login-box">
        <span class="user-icon"></span>
        <div class="user-info">Created by <a href="https://github.com/xiiforlearning/">xiiforlearning</a></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {},
};
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }

  .home-page {
    height: 100vh;
    background-image: url();
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: center;
    background-size: cover;
    position: relative;
  }

  .blurred-box {
    position: relative;
    width: 250px;
    height: 320px;
    top: calc(50% - 175px);
    left: calc(50% - 125px);
    background: inherit;
    border-radius: 1rem;
    overflow: hidden;
  }

  .blurred-box:after{
    content: '';
    width: 300px;
    background: inherit;
    position: absolute;
    left: -25px;
    right: 0;
    top: -25px;
    bottom: 0;
    box-shadow: inset 0 0 0 200px rgba(255,255,255,0.05);
    filter: blur(20px);
  }

  .user-login-box{
    position: relative;
    margin-top: 50px;
    height: calc(100% - 50px);
    text-align: center;
    z-index: 1;
  }
  .user-login-box > *{
    display: inline-block;
    width: 200px;
  }

  .user-icon{
    width: 125px;
    height: 125px;
    position: relative;
    border-radius: 50%;
    background-size: contain;
    background-image: url(../assets/homePage-profile.jpg);
  }

  .user-info{
    position: absolute;
    bottom: 30px;
    left: calc(50% - 100px);
    color: #fff;
    font-size: 14px;
  }

</style>
