<template>
  <div>
    <form id="search" @submit.prevent="search">
      <div class="field has-addons">
        <p class="control is-expanded has-icon has-icon-left">
          <input
            type="text"
            class="input"
            placeholder="zoeken naar shows.."
            v-model="searchInput"
          />

          <span class="icon is-small"> <i class="fas fa-search"></i></span>
        </p>
        <p class="control">
          <button type="submit" class="button is-success">
            <i class="fas fa-search"></i>
          </button>
        </p>
      </div>
    </form>

    <a
      @click="clear_search"
      v-if="searchResult.length > 0"
      class="pull-left"
      style="color: white"
      >herstel zoekopdracht <i class="fas fa-times"></i
    ></a>

    <br />
    <br />

    <p v-if="searchError" style="color: white">geen zoek resultaten gevonden.</p>

    <div class="columns is-multiline">
      <div class="column is-2" v-for="show in searchResult" :key="show.show.id">
        <div class="card">
          <div class="card-image">
            <router-link :to="'/shows/' + show.show.id"
              ><img
                v-if="show.show.image"
                v-bind:src="show.show.image.medium"
                v-bind:alt="show.show.name"
            /></router-link>
          </div>
          <div class="card-content">
            <p class="title is-4">
              <router-link :to="'/shows/' + show.show.id">{{
                show.show.name
              }}</router-link>
            </p>
            <p class="subtitle is-6" v-if="show.show.network">
              Draait op zender: <span>{{ show.show.network.name }}</span
              >S
            </p>
          </div>
          <div class="card-footer">
            <div class="card-footer-item">
              <a><fa-icon icon="rss" /> Abboneren</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import fetch from "@/library/fetch";

export default {
  props: {
    is_subscribed: {
      type: Function,
    },
  },
  data() {
    //lege zoekopdracht, leeg array
    return {
      searchInput: "",
      searchResult: [],
      searchError: false,
    };
  },

  methods: {
    search() {
      this.searchResult = [];
      this.searchError = false;
      //als de query terugkomt bij arraylengte > 0 zoek response anders geef zoekfout aan
      fetch.get("search/shows?q=" + this.searchInput).then((resp) => {
        if (resp.length > 0) {
          this.searchResult = resp;
        } else {
          this.searchError = true;
        }
      });
    },
    clear_search() {
      this.searchInput = "";
      this.searchError = false;
      this.searchResult = [];
    },
    subscribe(show) {
      this.$emit("subscribe", show);
    },
  },
};
</script>

<style>
#search {
  padding: 1em 0;
}

#app {
  background-color: rgb(97, 124, 163);
  height: 100%;
  padding: 30px;
  border: 10px solid white;
}

#app i.fa-search {
  color: white;
}
</style>
