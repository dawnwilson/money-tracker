<template>
    <div>
        <v-card class="mx-auto" width="400" prepend-icon="mdi-currency-usd">
            <template v-slot:title>
                Money Tracker
            </template>

            <v-text-field label="Amount" prefix="$"></v-text-field>
            <v-btn variant="outlined" prepend-icon="mdi-plus">Income</v-btn>
            <v-btn variant="outlined" prepend-icon="mdi-plus">Expense</v-btn>
        </v-card>

    </div>
</template>