<script setup>
import { computed } from 'vue'
import { formatCurrency } from "../utilities/helpers"

const props = defineProps({
  transactions: { type: Array, required: true, default: () => [] },
})

const sortedTransactions = computed(() => [...props.transactions].sort((a, b) => new Date(b.date) - new Date(a.date)))

function isIncome(type) {
  return type === "income"
}

function getTypeIcon(type) {
  if (type === "income") {
    return "mdi-arrow-up-thick"
  }
  else {
    return "mdi-arrow-down-thick"
  }
}
</script>


<template>
  <v-table>
    <thead>
      <tr v-if="transactions.length == 0">
        <th>Enter some transactions to start.</th>
      </tr>
      <tr v-else>
        <th class="text-center">
          Description
        </th>
        <th class="text-center">
          Transaction Amount
        </th>
        <th class="text-center">
          Date
        </th>
        <th class="text-center">
          Type
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in sortedTransactions"
        :key="item.name"
      >
        <td v-if="item.description !== null">
          {{ item.description }}
        </td>
        <td v-else>
          <span class="noDescription">No Description</span>
        </td>
        <td>{{ formatCurrency(item.amount) }}</td>
        <td>{{ item.date }}</td>
        <td>
          <v-icon
            :class="{ arrowIncome: isIncome(item.type), arrowExpense: !isIncome(item.type) }"
            :icon="getTypeIcon(item.type)"
            :title="item.type"
          />
        </td>
      </tr>
    </tbody>
  </v-table>
</template>


<style>
.arrowIncome {
  color: green;
}

.arrowExpense {
  color: red;
}

.noDescription {
  color: gray;
  font-style: italic;
}
</style>