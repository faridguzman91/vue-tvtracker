<template>
  <!--info html ontvangen en display-->
  <div class="columns">
    <div class="column is-8">
      <router-link to="/"
        ><font-awesome-icon icon="angle-double-left" />
        <p class="terug">Terug</p></router-link
      >

      <section class="content">
        <h1 class="title is-2">{{ details.name }}</h1>
        <!--html info vanuit api-->
        <div v-html="details.summary" class="omschrijving"></div>
      </section>

      <!--seizoenen in rooster-->

      <div v-for="season in schedule" :key="season.season">
        <h2 class="title is-4">Seizoen {{ season.season }}</h2>
        <table class="table is-striped is-fullwidth">
          <thead>
            <tr>
              <th>Datum</th>
              <th>Nummer</th>
              <th>Titel</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="show in season.episodes" :key="show.id">
              <td>{{ show.airdate }}</td>
              <td>{{ show.number }}</td>
              <td>{{ show.name }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="column is-4">
      <img v-if="details.image" :src="details.image.original" :alt="details.name" />
    </div>
  </div>
</template>

<script>
import fetch from "@/library/fetch";

export default {
  data() {
    return {
      details: {},
      schedule: {},
    };
  },
  //vul in details van shows in de data door response
  created() {
    fetch.get("shows/" + this.$route.params.id).then((resp) => {
      this.details = resp;
    });

    fetch.get("shows/" + this.$route.params.id + "/episodes").then((resp) => {
      let schedule = {};

      //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse
      //reverse array om de laatste aflevering eerst te tonen

      resp.reverse().forEach((e) => {
        let key = "season_" + e.season;
        if (!schedule[key]) schedule[key] = { episodes: [] };

        //push episodes naar array

        schedule[key].season = e.season;
        schedule[key].episodes.unshift(e);
      });

      this.schedule = schedule;

      //hoeft niet
      //Object.keys(schedule).forEach(s => {
      //schedule[s].episodes.sort(a,b) = > a.number - b.number)
      //})
    });
  },
};
</script>

<style>
router-link {
  color: white;
}

p.terug {
  color: white;
  font-size: 20px;
  border: 3px solid white;
  width: 100px;
  padding: 10px;
  text-align: center;
}

p.terug:hover {
  background-color: greenyellow;
  color: black;
  transition: 0.3s ease-in;
}

h1.title {
  color: white;
}

.omschrijving {
  color: white;
}

img {
  width: 100%;
  background-size: contain;
}
</style>
