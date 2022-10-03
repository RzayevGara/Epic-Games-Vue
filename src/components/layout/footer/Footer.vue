<template>
  <footer>
    <section class="footer-social">
      <div class="social-icons">
        <img src="../../../assets/image/svg/facebook.svg" alt="icons" />
        <img src="../../../assets/image/svg/twitter.svg" alt="icons" />
        <img src="../../../assets/image/svg/youtube.svg" alt="icons" />
      </div>
      <div class="arrow-up_box">
        <ArrowIcon/>
      </div>
    </section>
    <section class="footer-links">
      <div class="footer-links_resources">
        <h5>Resources</h5>
        <ul>
          <li>Support-A-Creator</li>
          <li>Distribute on Epic Games</li>
          <li>Careers</li>
          <li>Company</li>
        </ul>
        <ul>
          <li>Fan Art Policy</li>
          <li>UX Research</li>
          <li>Store EULA</li>
        </ul>
        <ul>
          <li>Online Services</li>
          <li>Community Rules</li>
          <li>Epic Newsroom</li>
        </ul>
      </div>
      <div class="footer-links_madeBy">
        <h5>Made By Epic Games</h5>
        <ul>
          <li>Battle Breakers</li>
          <li>Fortnite</li>
          <li>Infinity Blade</li>
        </ul>
        <ul>
          <li>Robo Recall</li>
          <li>Shadow Complex</li>
          <li>Unreal Tournament</li>
        </ul>
      </div>
    </section>
    <hr class="footer-border" />
    <section class="footer-copyright">
        <div>
            <p>
              © 2022, Epic Games, Inc. All rights reserved. Epic, Epic Games, the Epic
              Games logo, Fortnite, the Fortnite logo, Unreal, Unreal Engine, the
              Unreal Engine logo, Unreal Tournament, and the Unreal Tournament logo
              are trademarks or registered trademarks of Epic Games, Inc. in the
              United States of America and elsewhere. Other brands or product names
              are the trademarks of their respective owners. Non-US transactions
              through Epic Games International, S.à r.l.
            </p>
        </div>
    </section>
    <section class="footer-legal">
        <ul>
            <li>Terms of Service</li>
            <li>Privacy Policy</li>
            <li>Store Refund Policy</li>
        </ul>
        <div class="footer-legal_logos">
            <img src="../../../assets/image/svg/logo.png" alt="icons"/>
            <img src="../../../assets/image/svg/unreal.svg" alt="icons"/>
        </div>
    </section>
  </footer>
</template>


<script setup>
    import ArrowIcon from '../../../assets/image/svg/arrow-up.svg'
</script>