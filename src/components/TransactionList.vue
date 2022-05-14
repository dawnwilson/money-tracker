<script setup>
import { formatCurrency } from "../utilities/helpers"

defineProps({
  transactions: { type: Array, required: true },
})

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
        <th class="text-left">
          Transaction Amount
        </th>
        <th class="text-left">
          Type
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in transactions"
        :key="item.name"
      >
        <td>{{ formatCurrency(item.amount) }}</td>
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
</style>