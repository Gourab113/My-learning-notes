<template>
  <div class="max-w-5xl mx-auto p-6">
    <h1 class="text-5xl text-center font-bold mb-8">Learn Vocabulary</h1>

    <!-- Letter Selection -->
    <div class="flex flex-wrap justify-center gap-2 mb-8">
      <button
        v-for="letter in letters"
        :key="letter"
        @click="loadWords(letter)"
        class="px-4 py-2 border rounded hover:bg-gray-200"
      >
        {{ letter }}
      </button>
    </div>

    <v-expansion-panels class="my-4" variant="accordion">
      <v-expansion-panel
        v-for="word in filteredWords"
        :key="word.word"
        class="mb-2 rounded-lg bg-grey-lighten-5"
      >
        <!-- TITLE -->
        <v-expansion-panel-title class="bg-grey-lighten-4">
          <div class="text-h6 font-weight-medium text-grey-darken-3">
            {{ word.word }}
          </div>
        </v-expansion-panel-title>

        <!-- CONTENT -->
        <v-expansion-panel-text class="pa-3">
          <!-- Meaning -->
          <div class="mb-3">
            <strong class="text-grey-darken-2">Meaning:</strong>
            <span class="text-grey-darken-3">
              {{ word.meaning }}
            </span>
          </div>

          <!-- Synonyms -->
          <div class="mb-3">
            <strong class="text-grey-darken-2">Synonyms:</strong>
            <span class="text-grey-darken-3">
              {{ word.synonyms.join(", ") }}
            </span>
          </div>

          <!-- Antonyms -->
          <div class="mb-3">
            <strong class="text-grey-darken-2">Antonyms:</strong>
            <span class="text-grey-darken-3">
              {{ word.antonyms.join(", ") }}
            </span>
          </div>

          <!-- Sentences -->
          <div class="bg-grey-lighten-4 pa-2 rounded">
            <strong class="text-grey-darken-2">Sentences:</strong>

            <ul class="mt-2 pl-4 text-grey-darken-3">
              <li v-for="(s, i) in word.sentences" :key="i">
                {{ s }}
              </li>
            </ul>
          </div>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
export default {
  data() {
    return {
      words: [],
      search: "",
      letters: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
    };
  },

  async mounted() {
    await this.loadWords("A");
  },

  computed: {
    filteredWords() {
      return this.words.filter((item) =>
        item.word.toLowerCase().includes(this.search.toLowerCase()),
      );
    },
  },

  methods: {
    async loadWords(letter) {
      try {
        const data = await import(`../data/${letter.toLowerCase()}.json`);

        this.words = data.default;

        console.log("words", this.words);
      } catch (error) {
        console.error(error);
        this.words = [];
      }
    },
  },
};
</script>
