<template>
  <div class="searchbar-container">
    <input
      type="text"
      class="form-control"
      placeholder="Buscar lugares..."
      v-model="searchTerm"
    />
    <SearchResults />
  </div>
</template>

<script lang="ts">
import { useMapStore, usePlacesStore } from "@/composables";
import { computed, defineComponent, ref } from "vue";
import SearchResults from "@/components/search-results/SearchResults.vue";

export default defineComponent({
  name: "SearchBar",
  components: { SearchResults },
  setup() {
    const deviceTimeout = ref();
    const debounceValue = ref();
    const { SearchPlacesByTerm } = usePlacesStore()
    return {
      debounceValue,
      searchTerm: computed({
        get() {
          return debounceValue.value;
        },
        set(val: string) {

          if (debounceValue.value) clearTimeout(deviceTimeout.value)
          deviceTimeout.value = setTimeout(() => {
            debounceValue.value = val;
            SearchPlacesByTerm(val)
          }, 2000);
        },
      }),
    };
  },
});
</script>

<style scoped>
.searchbar-container {
  position: fixed;
  top: 30px;
  left: 30px;
  z-index: 8888;
  background-color: white;
  border-radius: 10px;
  /* box-shadow: 10px 10px 10px rgba(0,0,0,0.2); */
  overflow: hidden;
  width: 200px;
  padding: 5px;
  text-align: right;
}

p {
  margin: 0 auto;
  text-align: center;
}
</style>