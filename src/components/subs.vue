<template>
  <!--zoek.template-->
  <div>
    <search :is_geabboneerd="is_geabboneerd" @abbonneren="abbonneren" />

    <section class="section">
      <div class="columns">
        <div class="column is-3">
          <nav class="panel">
            <p class="panel-heading">geabbonneerde shows</p>
            <div
              class="panel-block show-item"
              v-for="show in abbonnementen"
              :key="show.id"
            >
              <router-link :to="'/shows/' + show.id"> {{ show.name }}</router-link>

              <div>
                <a @click="abbonneren(show)">
                  <i class="fas fa-times"></i>
                </a>
              </div>
            </div>
          </nav>
        </div>

        <!--rooster tabel-->

        <div class="columns is-9">
          <h1 class="title is-3">Rooster</h1>
          <p v-if="abbonnementen.length == 0">
            je hebt nu nog geen abbonnementen. zoek eerst boven aan, en abbonneer
          </p>

          <table class="table is-striped is-fullwidth">
            <thead>
              <tr>
                <th>show</th>
                <th>aflevering</th>
              </tr>
            </thead>

            <!--tabel rooster-->

            <template v-for="date in scheduleDates">
              <thead :key="date">
                <tr>
                  <th colspan="2">{{ date }}</th>
                </tr>
              </thead>
              <tbody :key="date">
                <tr v-for="show in schedule[date]" :key="show.episode.id">
                  <td>
                    {{ show.show.name }}
                    <!--?-->
                  </td>
                  <td>
                    {{ show.episode.season }}x{{ show.episode.number }}:
                    {{ show.episode.name }}
                  </td>
                </tr>
              </tbody>
            </template>
          </table>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import zoeken from "@/components/zoeken";
import fetch from "@/library/fetch";
import db from "@/library/database";
import moment from "moment";

export default {
  components: {
    search: zoeken,
  },
  data() {
    return {
      abbonnementen: [],
      schedule: [],
    };
  },

  computed: {
    //rooster datum sorteren
    scheduleDates() {
      return Object.keys(this.schedule).sort((a, b) => moment(a).isBefore(b));
    },
  },
  //uitkijken abbonemment
  watcher: {
    abbonnementen(data) {
      this.get_Schedule();
      database.set_Data(data);
    },
  },
  methods: {
    is_geabboneerd(show) {
      //niet false
      return this.abbonnementen.findIndex((e) => e.id === show.id) !== -1;
    },
    //false,
    abbonneren(show) {
      //check als deze abbos al in de lijst zitten, dan verwijderen uit lijst
      if (this.is_geabboneerd(show)) {
        //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
        //verander abbonneer knop naar niet abboneren ()

        return this.abbonnementen.splice(
          this.abbonnementen.findIndex((e) => e.id === show.id), //e => e.id
          1
        );
      }
      //push naar abbo array
      this.abbonnementen.push(show);
    },
    get_Schedule() {
      this.schedule = {};

      this.abbonnementen.forEach((show) => {
        fetch.get("shows/" + show.id + "/episodes").then((resp) => {
          resp.forEach((episode) => {
            //zoek 7 dagen voor volgende aflevering moment.js
            if (moment().subtract(7, "days").isBefore(episode.airdate)) {
              //als aflevering niet bestaat, set afleveringdatum
              if (this.schedule[episode.airdate] === undefined)
                this.$set(this.schedule, episode.airdate, []);

              //push rooster naar array

              this.schedule[episode.airdate].push({
                episode,
                show,
              });
            }
          });
        });
      });
    },
  },

  //dit werkt niet..
  //created() {
  //Database.get_Data().then((result) => {
  //this.abbonnementen = result.data().abbonnementen;
  //});
  // },
};
</script>

<style>
.show-item {
  justify-content: space-between;
  background-color: rgb(255, 255, 255);
}

h1.title {
  color: white;
}

.columns.is-9 {
  position: relative;
  left: 60px;
}

.columns.is-9 h1 {
  width: 220px;
}
</style>
