<template>
    <div>
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

        <a-spin :spinning="dataLoading" size="large">
            <a-table :columns="columns" :data-source="data">
                <template #bodyCell="{ column, record }">
                    <template v-if="column.key === 'status_name'">
                        <span>
                            <a-tag :color="record.status_color">
                                {{ record.status_name }}
                            </a-tag>
                        </span>
                    </template>
                </template>

                <template #expandedRowRender="{ record }">
                    <a-space :size="8">
                        <span>Контактное лицо: {{ record.contact_name }}</span>
                        <span>{{ record.contact_phone }}</span>
                        <span>{{ record.contact_mail }}</span>
                    </a-space>
                </template>
            </a-table>
        </a-spin>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

const columns = [
    {
        title: "Название",
        dataIndex: "lead_name",
        key: "lead_name",
    },
    {
        title: "Статус",
        dataIndex: "status_name",
        key: "status_name",
    },
    {
        title: "Бюджет",
        dataIndex: "price",
        key: "price",
    },
    {
        title: "Дата создания",
        key: "created_at",
        dataIndex: "created_at",
    },
    {
        title: "Ответственный",
        key: "responsible_user_id",
        dataIndex: "responsible_user_name",
    },
];

export default defineComponent({
    name: "App",
    data() {
        return {
            data: null,
            columns,
            searchValue: "",
            searchLoading: false,
            dataLoading: false,
        };
    },

    methods: {
        onSearch() {
            this.searchLoading = true;
        },
    },

    mounted() {
        this.dataLoading = true;
        axios("http://127.0.0.1:3008/").then((mainData) => {
            this.data = mainData.data;
            this.dataLoading = false;
        });
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
    font-family: "Helvetica Neue";
}
body {
    padding: 20px;
    background: #fcfcfc;
}

.ant-table-thead .ant-table-cell {
    color: rgba(134, 134, 134, 0.85);
}

.ant-row {
    margin-bottom: 20px;
}

.ant-tag.ant-tag-has-color {
    color: #333333;
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
