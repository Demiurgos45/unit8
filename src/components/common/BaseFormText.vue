<template>
  <base-form-field :title="title" :error="error">
    <input
      v-model="dataValue"
      class="form__input"
      :type="type"
      :placeholder="placeholder"
    >
  </base-form-field>
</template>

<script>
import formFieldMixins from "@/mixins/formFieldMixin"

export default {
  props: {
    type: {
      default: 'text'
    }
  },
  mixins: [formFieldMixins]
}
</script>

<style>

</style>