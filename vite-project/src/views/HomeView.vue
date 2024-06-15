<template>
  <div class="container">
    <section class="welcome__section">
      <div class="welcome__page-info">
        <h1>Мы рады приветствовать вас в Vito+ !</h1>
        <p>Заботьтесь о своем здоровье вместе с нами. Запишитесь на прием прямо сейчас и почувствуйте разницу в качестве медицинского обслуживания.</p>
        <router-link to="/appointments">
          <button>Запись</button>
        </router-link>
      </div>
      <img src="../assets/Group 59.png" alt="">

    </section>
  </div>
  </template>
  
  <script>
  export default {
    name: 'HomeView'
  }
  </script>
  
  <style scoped>



  h1,h2,h3,h4,h5,h6,p {
    color: #239AB5;

  }

  h1 {
    font-family: "Open Sans", sans-serif;
    font-weight: 800;
    font-size: 46px;
    width: 800px;
  }

  .welcome__section {
    display: flex;
    justify-content: space-between;
  }

  .welcome__page-info p {
    width: 680px;
    font-size: 34px;
    padding-top: 35px;
    font-weight: 400;
  }

  .welcome__page-info button {
    margin-top: 80px;
    background-color: #239AB5;
    padding: 15px 90px;
    font-size: 32px;
    font-weight: 600;
    border-radius: 15px;
    cursor: pointer;
  }

  .welcome__page-info button:hover {
    box-shadow: #239AB5 0 0 10px;
  }


  button > a {
    color: #fff;
  }

  .router-link-active {
    color: #fff;
    text-shadow: none; 
  }

  </style>
  