<template>
  <div id="Footer" :class="sidebarOpen ? 'reducedWidth' : 'fullWidth'">
    <!-- Partners -->
    <div id="fieldset"><div id="legend">PARTNERS</div></div>
    <div id="partners">
      <a class="logo" href="https://www.confiance.ai/en/" target="_blank">
        <img
          id="logo_confiance"
          src="/renault-welding-use-case/Logo_ConfianceAI.png"
          alt="Confiance AI"
        />
      </a>
      <a class="logo" href="https://www.irt-systemx.fr/en/" target="_blank">
        <img
          id="logo_systemx"
          src="/renault-welding-use-case/Logo_SystemX.png"
          alt="IRT SystemX"
        />
      </a>
      <a class="logo" href="https://www.renault.fr/" target="_blank">
        <img
          id="logo_renault"
          src="/renault-welding-use-case/Logo_Renault.png"
          alt="Renault"
        />
      </a>
    </div>

    <!-- Website structure -->
    <div id="structure">
      <ul
        class="section"
        v-for="(section, i) in config.themeConfig.nav"
        :key="i"
      >
        <li class="title">
          <a :href="section.link">{{ section.text }}</a>
        </li>
        <div class="subSections">
          <a
            class="subSection"
            v-for="(subSection, j) in section.items"
            :key="j"
            :href="subSection.link"
          >
            {{ subSection.text }}
          </a>
        </div>
      </ul>
    </div>

    <!-- Legal -->
    <div id="legal">
      <a href="/renault-welding-use-case/meta/terms#terms-conditions">
        Terms and conditions
      </a>
      -
      <a href="/renault-welding-use-case/meta/legal#legal-notice">
        Legal notice
      </a>
      -
      <a
        href="/renault-welding-use-case/meta/legal#privacy-policy-and-cookies"
      >
        Personal data and cookies
      </a>
      All rights reserved © 2020 IRT SystemX
    </div>
  </div>
</template>

<script>
import config from "../../config.js";

export default {
  name: "Footer",
  data() {
    return {
      config: config,
    };
  },
  computed: {
    sidebarOpen() {
      return false;
      // const ROUTE_PATH_LIST = ["/", "/fr/"];
      // return !ROUTE_PATH_LIST.includes(this.$route.path);
    },
  },
};
</script>

<style lang="stylus" scoped>

#Footer {
  font-size: 0.7em;
  position: relative;
  padding-top: 50px;

  &.fullWidth {
    left: 0px;
    width: 100vw;
  }
  &.reducedWidth {
    left: 20rem; /* width of the sidebar */
    width: calc(100vw - 20rem);
  }

  /* Partners */
  #fieldset {
    background: linear-gradient(90deg, $accentColor, $accentColor2);
    color: white;
    border: none;
    height: 5px;
    width: 100%;
    margin-bottom: 15px;
  }

  #legend {
    text-align: center;
    color: $accentColor;
    font-weight: bold;
    background: white;
    width: 100px;
    margin: 0;
    position: relative;
    top: -5px;
    left: 20px;
    font-size: 1.2em;
  }

  #partners {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    gap: 35px;
    padding: 5px 30px 15px 30px;

    #logo_systemx {
      height: 60px;
    }
    #logo_renault {
      height: 75px;
    }
    #logo_confiance {
      height: 60px;
    }
  }

  /* Website structure */
  #structure {
    background: linear-gradient(90deg, $accentColor, $accentColor2);
    color: white;
    padding: 30px;
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
    text-transform: uppercase;

    .title {
        list-style-type: "-  ";
        color: rgb(139, 139, 139);
      a {
        color: white;
        &:hover {
          color: rgb(182, 182, 182);
        }
      }
    }

    .section {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 10px;
      margin-right: 30px;
    }

    .subSections {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }
    .subSection {
      color: rgb(182, 182, 182);
    }
    .subSection:hover {
      color: white;
    }
  }

  /* Legal */
  #legal {
    font-size: 1.1em;
    padding: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: black;
    color: white;
    display: flex;
    gap: 10px;
    /* border-top: 1px solid var(--c-border); */

    a {
      color: lightgray;
    }
  }
}

@media (max-width: 950px) {
  #Footer.reducedWidth {
    left: 15rem; /* width of the sidebar */
    width: calc(100vw - 15rem);
  }
}

@media (max-width: 720px) {
  #Footer {
    font-size: 0.6em;

    #structure {
      flex-direction: column;
    }

    &.reducedWidth {
      left: 0px;
      width: 100vw;
    }
  }
}
</style>
