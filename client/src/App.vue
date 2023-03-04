<template>
    <a-row type="flex" justify="space-between">
        <a-col>
            <a-typography-title :level="4">Cделки</a-typography-title>
        </a-col>
        <a-col>
            <a-input-search
                v-model:value="searchValue"
                placeholder="Поиск по сделкам"
                style="width: 200px"
                :loading="searchLoading"
                @search="onSearch"
            />
        </a-col>
    </a-row>

    <a-table :columns="columns" :data-source="data">
        <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'status'">
                <span>
                    <a-tag :color="'green'">
                        {{ record.status }}
                    </a-tag>
                </span>
            </template>
        </template>

        <template #expandedRowRender="{ record }">
            <p style="margin: 0">Контактное лицо: {{ record.contact }}</p>
        </template>
    </a-table>
</template>

<script lang="ts">
import { defineComponent } from "vue";

const columns = [
    {
        title: "Название",
        dataIndex: "name",
        key: "name",
    },
    {
        title: "Статус",
        dataIndex: "status",
        key: "status",
    },
    {
        title: "Бюджет",
        dataIndex: "budget",
        key: "budget",
    },
    {
        title: "Дата создания",
        key: "date",
        dataIndex: "date",
    },
    {
        title: "Ответственный",
        key: "responsible",
        dataIndex: "responsible",
    },
];

const data = [
    {
        key: "1",
        name: "Разработка сайта",
        status: "Первичный контакт",
        budget: "150000₽",
        date: "27.02.23",
        responsible: "Сергеев В.В.",
        contact: "89991150041",
    },
    {
        key: "2",
        name: "Упаковка соцсети",
        status: "Продажа",
        budget: "15000₽",
        date: "27.02.23",
        responsible: "Петренко А.С.",
        contact: "89991150041",
    },
    {
        key: "3",
        name: "Ведение соцсети",
        status: "Переговоры",
        budget: "300000₽",
        date: "27.02.23",
        responsible: "Бутова М.В.",
        contact: "89991150041",
    },
];

export default defineComponent({
    name: "App",
    data() {
        return {
            data,
            columns,
            searchValue: "",
            searchLoading: false,
        };
    },

    methods: {
        onSearch() {
            this.searchLoading = true;
        },
    },
});
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
body {
    padding: 20px;
    background: #fcfcfc;
    font-family: "Helvetica Neue";
}

.ant-table-thead .ant-table-cell {
    color: rgba(134, 134, 134, 0.85);
}

.ant-row {
    margin-bottom: 20px;
}

@media (max-width: 700px) {
    body {
        padding: 10px;
    }

    .ant-row {
        margin-bottom: 10px;
    }
}
</style>
