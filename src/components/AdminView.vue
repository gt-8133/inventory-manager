<template>
  <div>
    <v-toolbar
      flat
      color="white"
    >
      <v-toolbar-title />
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      />
      <v-spacer />
      <v-btn
        color="primary"
        @click="newItem()"
      >
        <v-icon
          dark
          left
          tabindex="1"
        >add_circle</v-icon>
        New Item
      </v-btn>
      <v-dialog
        v-model="dialog"
        width="500"
        :fullscreen="this.$vuetify.breakpoint.xsOnly"
        @keydown.esc="close()"
      >
        <v-card @keydown.native.enter="save">
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex
                  xs12
                  align-center
                  justify-center
                  layout
                  text-xs-center
                >
                  <v-badge
                    right
                    bottom
                    overlap
                  >
                    <v-avatar
                      slot="badge"
                      :tile="false"
                      :size="35"
                      color="grey darken-1"
                      style="right:3px;bottom:3px"
                      @click="form.editImage=true"
                    >
                      <v-btn
                        fab
                        small
                        data-test="edit-image"
                        @click="selectImageUrl()"
                      ><v-icon
                        dark
                        style="font-size:21px"
                      >edit</v-icon></v-btn>
                    </v-avatar>
                    <v-avatar
                      :tile="false"
                      :size="100"
                      color="grey lighten-4"
                    >
                      <img
                        v-if="form.item.imageUrl"
                        :src="form.item.imageUrl"
                        alt="image"
                      >
                      <v-icon
                        v-else
                        large
                      >fitness_center</v-icon>
                    </v-avatar>
                  </v-badge>
                  <v-text-field
                    v-show="form.editImage"
                    ref="imageUrl"
                    v-model="form.item.imageUrl"
                    data-test="imageUrl"
                    validate-on-blur
                    solo
                    placeholder="www.example.com/some-image.png"
                    autofocus
                    @blur="form.editImage=false"
                  />
                </v-flex>
                <v-flex
                  xs12
                  sm6
                  md4
                >
                  <v-text-field
                    ref="adsf"
                    v-model="form.item.name"
                    label="Item name"
                  />
                </v-flex>
                <v-flex xs12>
                  <v-textarea
                    v-model="form.item.description"
                    solo
                    name="input-7-4"
                    label="Description"
                />                </v-flex>
                <v-flex
                  xs12
                  sm12
                  md12
                >
                  <v-layout wrap>
                    <v-flex
                      xs5
                      sm5
                      md5
                    >
                      <v-text-field
                        v-model="form.item.quantityUnits"
                        label="unit type"
                      />
                    </v-flex>
                    <v-flex
                      xs5
                      sm5
                      md5
                    >
                      <v-text-field
                        v-model="form.item.quantity"
                        :label="form.item.quantityUnits"
                        type="number"
                      />
                    </v-flex>
                    <v-flex>
                      <v-switch
                        v-model="form.item.reusable"
                        :label="`Reusable`"
                        light
                      />
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer />
            <v-btn
              flat
              color="primary"
              @click.native="close"
            >Cancel</v-btn>
            <v-btn
              color="primary"
              flat
              @click.native="save"
            >Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="items"
      :search="search"
      :loading="$apollo.loading"
      hide-actions
      class="elevation-1"
    >
      <template
        slot="items"
        slot-scope="props"
      >
        <td>
          <v-flex
            xs12
            align-center
            justify-left
            layout
            text-xs-center
          >
            <v-avatar
              :tile="false"
              :size="30"
              color="grey lighten-4"
            >
              <img
                v-if="props.item.imageUrl"
                :src="props.item.imageUrl"
                alt="image"
              >
              <v-icon v-else>fitness_center</v-icon>
            </v-avatar>
            &nbsp;{{ props.item.name }}
          </v-flex>
        </td>
        <td class="text-xs-right">{{ formatDate(props.item.updatedAt) }}</td>
        <td class="text-xs-right">{{ props.item.quantityUnits }}: {{ props.item.quantity }}</td>
        <td class="justify-center layout px-0">
          <v-icon
            data-test="edit"
            med
            class="mr-2"
            @click="editItem(props.item)"
          >
            edit
          </v-icon>
          <v-icon
            data-test="delete"
            med
            @click="deleteItem(props.item)"
          >
            delete
          </v-icon>
        </td>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import gql from 'graphql-tag'
import * as _ from 'lodash/fp'

const createItem = gql`
    mutation createItem(
      $name: String!
      $description: String!
      $quantity: Int!
      $quantityUnits: String!
      $reusable: Boolean!
      $imageUrl: String
      ) {
      createItem( data: {
        name: $name
        description: $description,
        quantity: $quantity
        quantityUnits: $quantityUnits
        reusable: $reusable
        imageUrl: $imageUrl
        }) {
        id
        description
        name
        quantity
        imageUrl
        updatedAt
        quantityUnits
        reusable
      }
    }
  `

const updateItem = gql`
  mutation updateItem(
    $id:ID!
    $name: String!
    $description: String!
    $quantity: Int!
    $quantityUnits: String!
    $reusable: Boolean!
    $imageUrl: String
  ) {
    updateItem(
      where: {
        id: $id
      }
      data: {
        name: $name
        description: $description,
        quantity: $quantity
        quantityUnits: $quantityUnits
        reusable: $reusable
        imageUrl: $imageUrl
      }
        ) {
        id
        description
        name
        quantity
        imageUrl
        updatedAt
        quantityUnits
        reusable
      }
  }
`
const deleteItem = gql`
mutation deleteItem($id:ID!){
  deleteItem(where:{id:$id}){
    id
  }
}
`


// GraphQL query
const items = gql`
  query items {
    items(orderBy: id_ASC) {
      id
      description
      name
      quantity
      imageUrl
      updatedAt
      quantityUnits
      reusable
    }
  }
`


export default {
  data: () => ({
    items: [],
    loading: 0,
    dialog: false,
    search: '',
    headers: [
      {
        text: 'Item',
        align: 'left',
        // sortable: false,
        value: 'name',
      },
      { text: 'Last Updated', value: 'updatedAt', align: 'right' },
      { text: 'Quantity', value: 'quantity', align: 'right' },
      {
        text: 'Actions', value: 'name', align: 'center', sortable: false,
      },
      // { text: 'Carbs (g)', value: 'carbs' },
      // { text: 'Protein (g)', value: 'protein' },
      // { text: 'Iron (%)', value: 'iron' }
    ],

    defaultItem: {
      name: '',
      description: '',
      quantity: 0,
      quantityUnits: 'count',
      imageUrl: `https://assets-cdn.github.com/images/icons/emoji/unicode/1f3${Math.round(Math.random() * 40 + 40)}.png?`,
      reusable: true,
    },
    form: {
      item: {},
      editImage: false,
    },
  }),

  computed: {
    formTitle() {
      return this.form.item.id ? 'Edit Item' : 'New Item'
    },
  },

  // Apollo GraphQL
  apollo: {
    items: {
      query: items,
      loadingKey: 'loading',
    },
  },

  methods: {
    formatDate(dateString) {
      return new Date(dateString).toISOString().substring(0, 10)
    },

    newItem() {
      this.editItem(_.clone(this.defaultItem))
      setTimeout(() => this.$refs.adsf.focus(), 50)
    },

    editItem(item) {
      // if focus is called to early, it won't work
      this.form.editImage = false
      this.form.item = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      if (window.confirm('Are you sure you want to delete this item?')) {
        this.$apollo.mutate({
          mutation: deleteItem,
          variables: { id: item.id },
          loadingKey: 'loading',
          updateQueries: {
            items: prev => ({
              items: _.flow(
                _.filter((i) => {
                  if (i.id === item.id) {
                    return false
                  }
                  return true
                }),
              )(prev.items),
            }),
          },
        })
      }
    },

    close() {
      this.dialog = false
    },

    save() {
      if (this.form.item.id) {
        this.form.item.quantity = window.parseInt(this.form.item.quantity)

        this.$apollo.mutate({
          mutation: updateItem,
          variables: this.form.item,
          loadingKey: 'loading',
          updateQueries: {
            items: prev => ({
              // append at head of list because we sort the posts reverse chronological

              items: _.flow(
                _.map((item) => {
                  if (item.id === this.form.item.id) {
                    return this.form.item
                  }
                  return item
                }),
              )(prev.items),
            }),
          },
        }).then((data) => {
          console.log(data)
          // Result
        })
      } else {
        // create a new item
        this.form.item.quantity = window.parseInt(this.form.item.quantity)

        this.$apollo.mutate({
          mutation: createItem,
          variables: this.form.item,
          loadingKey: 'loading',
          updateQueries: {
            items: (prev, {
              mutationResult,
            }) => ({
              // append at head of list because we sort the posts reverse chronological
              items: [mutationResult.data.createItem, ...prev.items],
            }),
          },
        }).then((data) => {
          // Result
          console.log(data)
        })
      }
      this.close()
    },
    selectImageUrl() {
      console.log(this.$refs.imageUrl)
      setTimeout(() => this.$refs.imageUrl.focus(), 20)
    },
  },
}
</script>

<style>
.v-dialog__content {
  height: inherit !important;
}
</style>
