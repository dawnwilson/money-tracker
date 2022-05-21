<script setup>
import { ref, computed } from 'vue'
import TransactionList from './TransactionList.vue'
import { formatCurrency, convertCurrencyToInteger } from "../utilities/helpers"

const transactionDate = ref()
const totalIncome = ref(0)
const totalExpenses = ref(0)
const currentBalance = computed(() => totalIncome.value - totalExpenses.value)
const newTransaction = ref()
const transactions = ref([])

function addIncome() {
  addTransaction("income")
}

function addExpense() {
  addTransaction("expense")
}

function addTransaction(type) {
  const amount = convertCurrencyToInteger(newTransaction.value)
  if (isNaN(amount)) {
    return
  }

  addToList(amount, type)

  if (type == "income") {
    totalIncome.value += amount
  } else {
    totalExpenses.value += amount
  }

  newTransaction.value = null
}

function addToList(amount, type) {
  transactions.value.unshift({ amount, date: transactionDate.value, type })
  transactionDate.value = null
}

function isDisabled() {
  return (isAmountNotValid() || isDateEmpty())
}

function isAmountNotValid() {
  return isNaN(newTransaction.value) || (newTransaction.value == null) || (newTransaction.value == '')
}

function isDateEmpty() {
  return transactionDate.value == null
}

</script>


<template>
  <div class="text-center">
    <v-card
      class="mx-auto my-6"
      max-width="500"
      variant="outlined"
    >
      <div>
        <h2 class="mt-5">
          Money Tracker
        </h2>
      </div>
      <v-card-content>
        <v-chip
          class="ma-2"
          close
          color="green"
          label
          text-color="white"
          variant="outlined"
        >
          Balance: {{ formatCurrency(currentBalance) }}
        </v-chip>
        <v-chip
          class="ma-2"
          close
          color="black"
          label
          text-color="white"
          variant="outlined"
        >
          Income: {{ formatCurrency(totalIncome) }}
        </v-chip>
        <v-chip
          class="ma-2"
          close
          color="red"
          label
          text-color="white"
          variant="outlined"
        >
          Expenses: {{ formatCurrency(totalExpenses) }}
        </v-chip>
        <br>
        <br>
        <v-text-field
          v-model="newTransaction"
          label="Enter transaction amount"
          variant="outlined"
          prefix="$"
          shaped
        />
        <input
          id="date"
          v-model="transactionDate"
          type="date"
          name="transaction-date"
          min="2018-01-01"
          max="2023-01-01"
        >
        <v-row>
          <v-col>
            <v-btn
              :disabled="isDisabled()"
              flat
              prepend-icon="mdi-plus-thick"
              color="black"
              @click="addIncome"
            >
              Income
            </v-btn>
          </v-col>
          <v-col>
            <v-btn
              :disabled="isDisabled()"
              flat
              prepend-icon="mdi-plus-thick"
              color="red"
              @click="addExpense"
            >
              Expense
            </v-btn>
          </v-col>
        </v-row>
      </v-card-content>
    </v-card>
    <v-card
      class="mx-auto"
      max-width="500"
      variant="outlined"
    >
      <TransactionList :transactions="transactions" />
    </v-card>
  </div>
</template>


<style>
button:disabled {
  pointer-events: auto;
  cursor: not-allowed;
}
</style>