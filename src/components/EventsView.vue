<template>
  <v-slide-x-transition>
    <div>
      <v-toolbar flat color="white">
        <v-toolbar-title/>
        <v-text-field
          v-model="search"
          append-icon="search"
          label="Search"
          single-line
          hide-details
        />
        <v-spacer/>
      </v-toolbar>
      <v-data-table
        :headers="headers"
        :items="items"
        :pagination.sync="pagination"
        :search="search"
        :loading="false"
        hide-actions
        class="elevation-1"
      >
        <template slot="items" slot-scope="props">
          <td>{{ formatDate(props.item.createdAt) }}</td>
          <td class="text-xs-right">
            <v-flex xs12 align-center justify-right layout class="text-xs-right">
              <v-avatar :tile="false" :size="30" color="grey lighten-4">
                <img v-if="props.item.item.imageUrl" :src="props.item.item.imageUrl" alt="image">
                <v-icon v-else>perm_identity</v-icon>
              </v-avatar>
              &nbsp;{{ props.item.item.name }}
            </v-flex>
          </td>
          <td>{{ props.item.item.quantityUnits }}: {{ props.item.quantity }}</td>

          <td>
            <v-flex xs12 align-center justify-left layout text-xs-center>
              <v-avatar :tile="false" :size="30" color="grey lighten-4">
                <img v-if="props.item.imageUrl" :src="props.item.imageUrl" alt="image">
                <v-icon v-else>perm_identity</v-icon>
              </v-avatar>
              &nbsp;{{ props.item.user.firstName}} {{props.item.user.lastName }}
            </v-flex>
          </td>

          <td class="justify-center layout px-0">
            <v-icon data-test="delete" med @click="deleteItem(props.item)">undo</v-icon>
          </td>
        </template>
      </v-data-table>
    </div>
  </v-slide-x-transition>
</template>
<script lang='ts'>
import Vue from "vue";
import { db } from "../browserServer";
import { Item, Transaction } from "../../server/entity/Entities";
import EditDialog from "./EditDialog.vue";

export default Vue.extend({
  data: () => ({
    items: <Transaction[]>[],
    loading: 0,
    search: "",
    pagination: {
      sortBy: "createdAt",
      descending: true,
      rowsPerPage: 100
    },
    headers: [
      { text: "Timestamp", value: "createdAt", align: "left" },
      { text: "Item", value: "item.name", align: "left" },
      { text: "Quantity", value: "quantity", align: "left" },
      {
        text: "User",
        align: "left",
        // sortable: false,
        value: "user.firstName"
      },
      {
        text: "Actions",
        value: "name",
        align: "center",
        sortable: false
      }
    ]
  }),

  computed: {},

  async mounted() {
    console.log("mounted");

    await this.fetchDb();
  },

  methods: {
    formatDate(dateString: Date) {
      return new Date(dateString).toISOString().substring(0, 10);
    },

    async fetchDb() {
      const items = await db()
        .getRepository(Transaction)
        .find({ relations: ["user", "item"], order: { createdAt: 1 } });
      console.log("mounted item", items);
      console.log(items[0]);
      if (this.items.length && this.items.length !== items.length) {
        this.$store.commit("eventNotification");
      }
      this.items = items;
    },

    async deleteItem(item: Item) {
      if (window.confirm("Are you sure you want to delete this item?")) {
        console.log("delete Item");
        // await db().getRepository(Item).delete(item.id)
        // await this.fetchDb()
      }
    },

    editItem(item: Item) {}
  }
});
</script>

<style>
.v-dialog__content {
  height: inherit !important;
}
</style>
