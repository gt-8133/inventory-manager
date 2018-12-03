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
        <template slot="items" slot-scope="props" @click="read(props.item)">
          <tr :key="props.item.id" @click="$store.dispatch('viewEvent', props.item.id)">
          <td>
            {{ formatDate(props.item.createdAt) }}
            <div class="new" v-if="isNew(props.item)"></div>
          </td>
          <td class="text-xs-right">
            <v-flex xs12 align-center justify-right layout class="text-xs-right">
              <v-avatar :tile="false" :size="30" color="grey lighten-4">
                <img v-if="props.item.item.imageUrl" :src="props.item.item.imageUrl" alt="image">
                <v-icon v-else>perm_identity</v-icon>
              </v-avatar>
              &nbsp;{{ props.item.item.name }}
            </v-flex>
          </td>
          <td class="decrease">{{ props.item.quantity }}</td>

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
          </tr>
        </template>
      </v-data-table>
    </div>
  </v-slide-x-transition>
</template>
<script lang='ts'>
import Vue from "vue";
import { Item, Transaction, Notification } from "../../server/entity/Entities";
import models from "../../server/models/models";
import EditDialog from "./EditDialog.vue"
import { mapState } from 'vuex';

export default Vue.extend({

  data: () => ({
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

  computed: {
    ...mapState({
      items: (state: { events: { items: Transaction[] } }) => state.events
    })
  },

  async mounted() {
    console.log("mounted");

    await this.$store.dispatch('fetchEvents');
  },

  methods: {
    formatDate(dateString: Date) {
      return new Date(dateString).toISOString().substring(0, 10);
    },
    isNew(item) {
      const nots: Notification[] = this.$store.state.notifications
      const isNew = nots.some((n) => n.unread && n.transaction.id === item.id)
      console.log(item, 'isnew', isNew)
      return isNew
    },




    async deleteItem(item: Item) {
      if (window.confirm("Are you sure you want to delete this item?")) {
        console.log("delete Item");
        await models.deleteItem(item.id)
        // await this.fetchEvents()
      }
    },

    editItem(item: Item) { }
  }
});
</script>

<style>
.v-dialog__content {
  height: inherit !important;
}
.new {
  font-size: 12px;
  width: 10px;
  background-color: rgb(59, 194, 100);
  box-shadow: 0px 0px 4px grey;
  color: white;
  font-weight: bold;
  height: 8px;
  width: 8px;
  margin-bottom: 0px;
  margin-left: 4px;
  text-transform: uppercase;
  border-radius: 50%;
  display: inline-block;
}
</style>
