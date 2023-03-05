<template>
    <div>
        <a-row type="flex" justify="space-between">
            <a-col>
                <a-typography-title :level="3">Cделки</a-typography-title>
            </a-col>
            <a-col align="middle">
                <a-row>
                    <a-space>
                        <a-tooltip v-if="inputError">
                            <template #title
                                >Введите минимум 3 символа</template
                            >

                            <warning-two-tone
                                v-if="inputError"
                                :style="{ fontSize: '20px' }"
                                two-tone-color="#eb3f36"
                            />
                        </a-tooltip>
                        <a-input-search
                            v-model:value="searchValue"
                            placeholder="Поиск по сделкам"
                            style="width: 200px"
                            :loading="searchLoading"
                            @search="onSearch"
                        />
                    </a-space>
                </a-row>
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

                    <template v-if="column.key === 'responsible_user_name'">
                        <span>
                            {{ record.responsible_user_name }}
                        </span>
                    </template>
                </template>

                <template #expandedRowRender="{ record }">
                    <a-space :size="8">
                        <idcard-outlined />
                        <span>
                            {{ record.contact_name }}
                        </span>
                        <span> | </span>
                        <a :href="`tel:${record.contact_phone}`">
                            <span>{{ record.contact_phone }}</span>
                        </a>
                        <span> | </span>
                        <a :href="`mailto:${record.contact_mail}`">
                            <span>{{ record.contact_mail }}</span>
                        </a>
                    </a-space>
                </template>
            </a-table>
        </a-spin>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import {
    IdcardOutlined,
    UserOutlined,
    WarningTwoTone,
} from "@ant-design/icons-vue";

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
        key: "responsible_user_name",
        dataIndex: "responsible_user_name",
    },
];

export default defineComponent({
    name: "App",
    components: {
        IdcardOutlined,
        UserOutlined,
        WarningTwoTone,
    },
    data() {
        return {
            data: null,
            columns,
            searchValue: "",
            searchLoading: false,
            dataLoading: false,
            inputError: false,
        };
    },

    methods: {
        onSearch(searchValue: string): void {
            if (searchValue.length >= 1 && searchValue.length < 3) {
                this.inputError = true;
            } else {
                this.inputError = false;
                this.fetchData(searchValue);
            }
        },

        fetchData(searchValue: string): void {
            this.dataLoading = true;
            this.searchLoading = true;
            axios(`http://127.0.0.1:3008/?query=${searchValue}`)
                .then((mainData) => {
                    this.data = mainData.data;
                    this.dataLoading = false;
                    this.searchLoading = false;
                })
                .catch((err) => {
                    this.data = null;
                    this.dataLoading = false;
                    this.searchLoading = false;
                    console.log(err);
                });
        },
    },

    mounted() {
        this.fetchData(this.searchValue);
    },
});
</script>

<style>
#app {
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

.ant-space {
    margin-left: 50px;
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
