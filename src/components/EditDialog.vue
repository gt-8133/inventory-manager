<template>
  <v-dialog
    v-model="form.isOpen"
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
            <v-flex xs12 align-center justify-center layout text-xs-center>
              <v-badge right bottom overlap>
                <v-avatar
                  slot="badge"
                  :tile="false"
                  :size="35"
                  color="grey darken-1"
                  style="right:3px;bottom:3px"
                  @click="form.editImage=true"
                >
                  <v-btn fab small data-test="edit-image" @click="selectImageUrl()">
                    <v-icon dark style="font-size:21px">edit</v-icon>
                  </v-btn>
                </v-avatar>
                <v-avatar :tile="false" :size="100" color="grey lighten-4">
                  <img v-if="form.item.imageUrl" :src="form.item.imageUrl" alt="image">
                  <v-icon v-else large>fitness_center</v-icon>
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
            <v-flex xs12 sm6 md4>
              <v-text-field
                ref="adsf"
                v-model="form.item.name"
                data-test="name-edit"
                label="Item name"
              />
            </v-flex>
            <v-flex xs12>
              <v-textarea
                v-model="form.item.description"
                solo
                name="input-7-4"
                label="Description"
              />
            </v-flex>
            <v-flex xs12 sm12 md12>
              <v-layout wrap>
                <v-flex xs5 sm5 md5>
                  <v-text-field v-model="form.item.quantityUnits" label="unit type"/>
                </v-flex>
                <v-flex xs5 sm5 md5>
                  <v-text-field
                    v-model="form.item.quantity"
                    :label="form.item.quantityUnits"
                    type="number"
                  />
                </v-flex>
                <v-flex>
                  <v-switch v-model="form.item.reusable" :label="`Reusable`" light/>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer/>
        <v-btn flat color="primary" @click.native="close">Cancel</v-btn>
        <v-btn color="primary" flat @click.native="save">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Item } from "server/entity/Entities";
import { db } from "@/browserServer";

const defaultItem: Item = {
  id: 123,
  location: "room 2",
  name: "",
  description: "",
  quantity: 0,
  quantityUnits: "count",
  imageUrl:
    "https://assets-cdn.github.com/images/icons/emoji/unicode/1f340.png?",
  reusable: true
};

@Component({})
class EditDialog extends Vue {
  @Prop({ required: true })
  form!: {
    item: Item;
    editImage: boolean;
  };

  get formTitle() {
    if (this.form.item.id) return "Edit Item";
    return "New Item";
  }

  close() {
    this.$emit("close");
  }

  save() {
    this.$emit("save");
  }

  selectImageUrl() {
    console.log(this.$refs.imageUrl);
    setTimeout(() => (<HTMLInputElement>this.$refs.imageUrl).focus(), 20);
  }
}

export default EditDialog;
</script>


