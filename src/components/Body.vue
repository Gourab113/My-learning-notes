<template>
  <div class="min-h-screen bg-slate-50 py-10">
    <div class="max-w-6xl mx-auto px-6">
      <h1 class="text-5xl font-black text-center text-slate-800 mb-12">
        Learning Track
      </h1>

      <!-- CATEGORY -->
      <div
        v-for="(category, categoryIndex) in notesData"
        :key="categoryIndex"
        class="mb-8 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
      >
        <div
          class="flex justify-between items-center px-6 py-5 bg-slate-100 cursor-pointer hover:bg-slate-200 transition"
          @click="toggleCategory(categoryIndex)"
        >
          <h2 class="text-2xl font-bold text-slate-800">
            {{ category.category }}
          </h2>

          <span class="text-xl font-bold">
            {{ openCategories.includes(categoryIndex) ? "▼" : "▶" }}
          </span>
        </div>

        <!-- NOTES -->
        <div
          v-show="openCategories.includes(categoryIndex)"
          class="p-6 space-y-4"
        >
          <div
            v-for="(note, noteIndex) in category.notes"
            :key="noteIndex"
            class="border border-slate-200 rounded-xl overflow-hidden bg-white hover:shadow-md transition"
          >
            <!-- NOTE HEADER -->
            <div
              class="flex justify-between items-center px-5 py-4 cursor-pointer hover:bg-slate-50"
              @click="toggleNote(categoryIndex, noteIndex)"
            >
              <h3 class="font-bold text-lg text-slate-800">
                {{ note.title }}
              </h3>

              <span class="font-bold text-lg">
                {{ isNoteOpen(categoryIndex, noteIndex) ? "−" : "+" }}
              </span>
            </div>

            <!-- LINKS -->
            <div
              v-show="isNoteOpen(categoryIndex, noteIndex)"
              class="border-t border-slate-100 p-5"
            >
              <div class="flex flex-wrap gap-3">
                <a
                  v-for="(link, linkIndex) in note.links"
                  :key="linkIndex"
                  :href="link.url"
                  target="_blank"
                  class="px-4 py-2 rounded-lg bg-blue-50 text-blue-700 text-sm font-medium hover:bg-blue-100 hover:scale-105 transition"
                >
                  🔗 {{ link.name }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import notesData from "../data/notesData";

export default {
  data() {
    return {
      notesData,
      openCategories: [],
      openNotes: {},
    };
  },

  mounted() {
    // সব category open থাকবে শুরুতে
    this.openCategories = this.notesData.map((_, i) => i);
  },

  methods: {
    toggleCategory(index) {
      if (this.openCategories.includes(index)) {
        this.openCategories = this.openCategories.filter((x) => x !== index);
      } else {
        this.openCategories.push(index);
      }
    },

    toggleNote(categoryIndex, noteIndex) {
      const key = `${categoryIndex}-${noteIndex}`;

      this.openNotes = {
        ...this.openNotes,
        [key]: !this.openNotes[key],
      };
    },

    isNoteOpen(categoryIndex, noteIndex) {
      return this.openNotes[`${categoryIndex}-${noteIndex}`];
    },
  },
};
</script>
