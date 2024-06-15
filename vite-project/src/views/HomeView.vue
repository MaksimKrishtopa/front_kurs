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
      <img src="../assets/Group 59.png" alt="info-img">

    </section>
    <section class="welcome__section-quality">
      <img src="../assets/Group 60.png" alt="quality-img">
        <ul class="quality__list">
          <li>Современное оборудование</li>
          <li>Высококвалифицированные специалисты</li>
          <li>Широкий спектр услуг</li>
          <li>Удобная запись на прием</li>
          <li>Индивидуальный подход к каждому пациенту запись на прием</li>
        </ul>
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
    gap: 70px;

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

  .welcome__section-quality {
    margin-top: 125px;
    display: flex;
    gap: 225px;
    align-items: center;
  }
  
  .quality__list {
    color: #239AB5;
    width: 700px;
  }
  
  .quality__list li {
    margin-bottom: 20px;
    position: relative;
    padding-left: 46px;
    font-size: 36px;
    font-weight: 500;
  }
  
  .quality__list li::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 30px;
    height: 30px;
    background-color: #00D300;
    border-radius: 50%;
  }

  </style>
  