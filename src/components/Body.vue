<template>
  <div class="w-full px-12 py-6 bg-gray-50 min-h-screen">
    <h1 class="text-4xl font-extrabold text-center mb-10 text-gray-800">
      Competitive Programming
    </h1>

    <div
      v-for="(cat, i) in cpData"
      :key="i"
      class="mb-6 rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden"
    >
      <!-- CATEGORY HEADER -->
      <div
        class="flex justify-between items-center px-6 py-4 bg-blue-50 cursor-pointer hover:bg-blue-100 transition"
        @click="toggleCategory(i)"
      >
        <h2 class="text-xl font-bold text-gray-800">
          {{ cat.category }}
        </h2>

        <span class="text-gray-600 text-lg font-bold">
          {{ openCategories.includes(i) ? "▲" : "▼" }}
        </span>
      </div>

      <!-- CONTENT -->
      <div v-show="openCategories.includes(i)" class="divide-y divide-gray-100">
        <div
          v-for="(problem, j) in cat.problems"
          :key="j"
          class="px-6 py-4 flex justify-between items-start hover:bg-gray-50 transition"
        >
          <!-- LEFT SIDE -->
          <div class="flex-1 pr-6">
            <!-- TITLE -->
            <a
              :href="problem.link"
              target="_blank"
              class="text-lg font-semibold text-blue-700 hover:underline"
            >
              {{ problem.title }}
            </a>

            <!-- SOURCE -->
            <p class="text-sm text-gray-600 mt-1">
              <span class="font-medium text-gray-700">Source:</span>
              {{ problem.source }}
            </p>

            <!-- TOPICS -->
            <div class="mt-2 text-sm leading-relaxed">
              <span v-for="(topic, k) in problem.topics" :key="k" class="mr-3">
                <span class="font-semibold text-gray-800">
                  {{ topic.name }}:
                </span>

                <a
                  v-for="(link, l) in topic.learnLinks"
                  :key="l"
                  :href="link"
                  target="_blank"
                  class="text-sky-600 font-medium hover:underline ml-1"
                >
                  learn{{ l + 1 }}
                </a>

                <span
                  v-if="k !== problem.topics.length - 1"
                  class="text-gray-300"
                >
                  |
                </span>
              </span>
            </div>
          </div>

          <!-- RIGHT SIDE -->
          <div class="flex flex-col items-end gap-2 whitespace-nowrap">
            <!-- RATING -->
            <div class="text-xl font-extrabold text-gray-800">
              {{ problem.rating }}
            </div>

            <!-- DIFFICULTY -->
            <span
              class="text-sm px-3 py-1 rounded-full font-semibold"
              :class="getDifficultyClass(problem.rating)"
            >
              {{ getDifficultyLabel(problem.rating) }}
            </span>

            <!-- IMPORTANCE -->
            <span
              class="text-sm px-3 py-1 bg-gray-100 text-gray-700 rounded-full font-medium"
            >
              Importance: {{ problem.importance }}/10
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import cpData from "../data/CpData";

export default {
  data() {
    return {
      cpData,
      openCategories: [],
    };
  },

  methods: {
    toggleCategory(i) {
      if (this.openCategories.includes(i)) {
        this.openCategories = this.openCategories.filter((x) => x !== i);
      } else {
        this.openCategories.push(i);
      }
    },

    getDifficultyLabel(rating) {
      if (rating <= 1200) return "Easy";
      if (rating <= 1800) return "Medium";
      return "Hard";
    },

    getDifficultyClass(rating) {
      if (rating <= 1200) return "bg-green-100 text-green-700";
      if (rating <= 1800) return "bg-yellow-100 text-yellow-800";
      return "bg-red-100 text-red-700";
    },
  },
};
</script>
