<template>
  <div class="flex justify-center h-screen">
    <div
      class="bg-white shadow-md rounded px-8 pt-6 pb-8 m-auto flex flex-col w-96"
    >
      <div class="flex flex-row">
        <Logo />
        <span
          class="w-4/5 m-auto ml-4 pb-2 font-bold font-serif text-4xl text-gray-600"
          >SSU 1
        </span>
      </div>
      <router-view />
    </div>
  </div>
</template>

<script>
import Logo from "../../components/logo/logo";

export default {
  name: "Auth",
  components: {
    Logo
  }
};
</script>
