<script setup>
import { ref, computed } from 'vue'
import TransactionList from './TransactionList.vue'

let totalIncome = ref(0)
let totalExpenses = ref(0)
const currentBalance = computed(() => (totalIncome.value - totalExpenses.value).toFixed(2))
const newTransaction = ref()
const transactions = ref([])

function addIncome() {
    const amount = parseFloat(newTransaction.value)
    if (isNaN(amount)) {
        return
    }
    addToList(amount, "income")
    totalIncome.value += amount
    newTransaction.value = null
}

function addExpense() {
    const amount = parseFloat(newTransaction.value)
    if (isNaN(amount)) {
        return
    }
    addToList(amount, "expense")
    totalExpenses.value += amount
    newTransaction.value = null
}

function addToList(transactionAmount, transactionType) {
    transactions.value.push({ amount: transactionAmount, type: transactionType })
}
</script>


<template>
    <div style="margin-top:45px; text-align: center;">
        <v-card class="mx-auto" max-width="500" variant="outlined">
            <div>
                <div style="text-align: center; margin-top: 15px; font-size: x-large; font-weight:bold;">
                    Money Tracker
                </div>
            </div>
            <v-card-content>
                <v-chip class="ma-2" close color="green" label text-color="white" variant="outlined">
                    Balance: $ {{ currentBalance }}
                </v-chip>
                <v-chip class="ma-2" close color="black" label text-color="white" variant="outlined">
                    Income: $ {{ totalIncome.toFixed(2) }}
                </v-chip>
                <v-chip class="ma-2" close color="red" label text-color="white" variant="outlined">
                    Expenses: $ {{ totalExpenses.toFixed(2) }}
                </v-chip>
                <br />
                <br />
                <v-text-field v-model="newTransaction" label="Enter transaction amount" variant="outlined" prefix="$"
                    shaped>
                </v-text-field>
                <v-row>
                    <v-col>
                        <v-btn @click="addIncome"
                            :disabled="isNaN(newTransaction) || (newTransaction == null) || (newTransaction == '')" flat
                            prepend-icon="mdi-plus-thick" color="black">Income</v-btn>
                    </v-col>
                    <v-col>
                        <v-btn @click="addExpense"
                            :disabled="isNaN(newTransaction) || (newTransaction == null) || (newTransaction == '')" flat
                            prepend-icon="mdi-plus-thick" color="red">Expense</v-btn>
                    </v-col>
                </v-row>
            </v-card-content>
        </v-card>
        <v-card class="mx-auto" max-width="500" variant="outlined">
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