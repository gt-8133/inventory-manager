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
        <v-btn color="primary" @click="newItem()">
          <v-icon dark left tabindex="1">add_circle</v-icon>New Item
        </v-btn>
      </v-toolbar>
      <v-data-table
        :headers="headers"
        :items="items"
        :search="search"
        :loading="false"
        hide-actions
        class="elevation-1"
      >
        <template slot="items" slot-scope="props">
          <td>
            <v-flex xs12 align-center justify-left layout text-xs-center>
              <v-avatar :tile="false" :size="30" color="grey lighten-4">
                <img v-if="props.item.imageUrl" :src="props.item.imageUrl" alt="image">
                <v-icon v-else>fitness_center</v-icon>
              </v-avatar>
              &nbsp;{{ props.item.name }}
            </v-flex>
          </td>
          <td class="text-xs-right">{{ formatDate(props.item.updatedAt) }}</td>
          <td class="text-xs-right">{{ props.item.quantityUnits }}: {{ props.item.quantity }}</td>
          <td class="justify-center layout px-0">
            <v-icon data-test="edit" med class="mr-2" @click="editItem(props.item)">edit</v-icon>
            <v-icon data-test="delete" med @click="deleteItem(props.item)">delete</v-icon>
          </td>
        </template>
      </v-data-table>
      <EditDialog :form="form" v-on:save="save()" v-on:close="form.isOpen = false"></EditDialog>
    </div>
  </v-slide-x-transition>
</template>
<script lang='ts'>
import Vue from "vue";
import { Item } from "../../server/entity/Entities";
import models from "../../server/models/models";

import EditDialog from "./EditDialog.vue";
import { mapState } from 'vuex';

const defaultItem: Item = {
  id: 0,
  location: "room 2",
  name: "",
  description: "",
  quantity: 0,
  quantityUnits: "count",
  imageUrl:
    "https://assets-cdn.github.com/images/icons/emoji/unicode/1f340.png?",
  reusable: true,
  low: 0,
  high: 5,
};

export default Vue.extend({
  data: () => ({
    loading: 0,
    search: "",
    headers: [
      {
        text: "Item",
        align: "left",
        // sortable: false,
        value: "name"
      },
      { text: "Last Updated", value: "updatedAt", align: "right" },
      { text: "Quantity", value: "quantity", align: "right" },
      {
        text: "Actions",
        value: "name",
        align: "center",
        sortable: false
      }
    ],

    defaultItem,
    form: {
      item: defaultItem,
      editImage: false,
      isOpen: false
    },
   
  }),

  computed: {
    formTitle() {
      if (this.form.item.id) return "Edit Item";
      return "New Item";
    },
     ...mapState({
      items: (store: { items: Item[] }) => store.items
    })
  },

  async mounted() {
    const item = await models.getItem(1)
    console.log('item!', item)
    console.log("mounted");

    await this.fetchDb();
  },

  methods: {
    formatDate(dateString: Date) {
      return new Date(dateString).toISOString().substring(0, 10);
    },

    newItem() {
      this.editItem(Object.assign({}, this.defaultItem));
      // setTimeout(() => (<HTMLInputElement>this.$refs.adsf).focus(), 50)
    },

    async fetchDb() {
      this.$store.dispatch('fetchItems')
    },

    async deleteItem(item: Item) {
      if (window.confirm("Are you sure you want to delete this item?")) {
        console.log("delete Item");
        await models.deleteItem(item.id)
        await this.$store.dispatch('fetchItems')
      }
    },

    editItem(item: Item) {
      // if focus is called to early, it won't work
      this.form.editImage = false;
      this.form.item = Object.assign({}, item);
      this.form.isOpen = true;
    },

    async save() {
      if (this.form.item.id !== 0) {
        // update item
        // this.form.item.quantity = parseInt(this.form.item.quantity)
        console.log("updated Item");
        await models.saveItem(this.form.item)
      } else {
        console.log("create item");
        await models.createItem(this.form.item)
      }
      this.close();
      await this.fetchDb();
    },

    close() {
      this.form.isOpen = false;
    }
  },
  components: {
    EditDialog
  }
});
</script>

<style>
.v-dialog__content {
  height: inherit !important;
}
</style>
