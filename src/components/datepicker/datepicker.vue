<template>
  <datepicker-lite
    v-model="selected"
    :placeholder-attr="periode"
    :class-attr="datepickerSetting.class"
    @value-changed="changePeriode"
  />
</template>

<script>
import { defineComponent } from "vue";
import DatepickerLite from "vue3-datepicker-lite";

export default defineComponent({
  name: "date",
  props: ["periode"],
  data() {
    return {
      selected: ""
    };
  },
  components: {
    DatepickerLite
  },
  methods: {
    changePeriode(date) {
      this.selected = date;
      console.log(this.selected);
      console.log(this.periode);

      this.$emit("periode", this.selected);
    }
  },
  setup() {
    const datepickerSetting = {
      class: "border-2 border-black rounded-md my-auto mx-2 px-2 w-40",
      placeholder: "Select",
      locale: {
        format: "YYYY/MM/DD",
        weekday: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        todayBtn: "Today",
        clearBtn: "Clear",
        closeBtn: "Close"
      },
      changeEvent: res => {
        console.log(res + " selected!");
      },
      disableInput: false
    };

    return {
      datepickerSetting
    };
  }
});
</script>

<style></style>
