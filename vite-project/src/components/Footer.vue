<template>
  <footer>
    <div class="container footer__container">
      <div class="footer__logo">
        <img src="../assets/logo.png" alt="Логотип" class="logo">
      </div>
      <ul class="footer__links">
        <li><router-link to="/">Главная</router-link></li>
        <li><router-link to="/appointments">Запись</router-link></li>
        <li><router-link to="/profile">Личный кабинет</router-link></li>
      </ul>
      <div class="footer__extra">
        <p><b>Контактная информация:</b></p>
        <p>Телефон: +7 (123) 456-78-90</p>
        <p>Email: info@vito-plus.com</p>
      </div>
      <img class="footer__img" src="../assets/Group 1.png" alt="footer-img">
    </div>
  </footer>
</template>
  
  <script>
  export default {}
  </script>
  
  <style scoped>
  footer {
    margin-top: 140px;
    background-color: #239AB5;
    display: flex;
    align-items: center;
    flex-shrink: 0;
    color: #fff;
  }

  .footer__container {
    display: flex;
    flex-direction: row;
    font-size: 36px;
    align-items: center;
    gap: 125px;
    padding: 50px 0;
  }
  
  
  .footer__logo {
    margin-bottom: 20px;
  }
  
  .logo {
    width: 125px;
    height: auto;
  }
  

  .footer__links li {
    font-weight: 500;
  }
  
  .footer__links a {
    color: #fff;
    text-decoration: none;
    font-size: 24px;
    font-weight: 600;
  }
  
  .footer__extra {
    display: flex;
    flex-direction: column;
    gap: 10px;
    font-size: 30px;
  }
  
  .footer__extra p {
    margin: 5px 0;
    font-size: 22px;
    font-weight: 500;
  }

  .footer__img {
    object-fit: contain;
    width: 425px;
  }
  
  </style>