<template>
  <!--zoek.template-->
  <div>
    <search />
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
};
</script>

<style></style>
