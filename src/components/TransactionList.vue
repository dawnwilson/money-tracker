<script setup>
import { ref } from 'vue'

const props = defineProps({
    transactions: Array,
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
            <tr>
                <th class="text-left">
                    Transaction Amount
                </th>
                <th class="text-left">
                    Type
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in transactions" :key="item.name">
                <td>{{ item.amount }}</td>
                <td>{{ item.type }}<v-icon
                        :class="{ arrowIncome: isIncome(item.type), arrowExpense: !isIncome(item.type) }"
                        :icon="getTypeIcon(item.type)"></v-icon>
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