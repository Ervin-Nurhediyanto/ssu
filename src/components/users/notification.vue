<template>
  <!-- Private Chats -->
  <div class="w-screen h-2/5 absolute bottom-1 flex flex-row">
    <div
      v-for="(user, indexUser) in userChats"
      :key="indexUser"
      class="flex flex-col"
    >
      <div
        v-if="user._id !== userId"
        class="w-60 h-10 mx-1 border-2 border-black flex flex-row"
      >
        <div class="bg-gray-200 p-1">{{ user.username }}</div>
        <button
          class="text-white p-1 ml-auto mr-0 w-1/5 font-bold bg-red-400 border-l-2 border-black"
          @click="cancel(indexUser)"
        >
          X
        </button>
      </div>

      <div
        v-if="user._id !== userId"
        class="overflow-scroll h-80 w-60 mx-1 p-1 bg-white border-l-2 border-r-2 border-black"
      >
        <div v-for="(message, indexMessage) in messages" :key="indexMessage">
          <div
            v-if="
              message.senderId === userId && message.receiverId === user._id
            "
            class="text-right flex flex-col"
          >
            <span class="font-bold underline">You</span>
            {{ message.message }}
          </div>

          <div
            v-if="
              message.senderId === user._id && message.receiverId === userId
            "
            class="text-left flex flex-col"
          >
            <span class="font-bold underline">{{ user.username }}</span>
            {{ message.message }}
          </div>
        </div>
      </div>

      <div>
        <input
          v-if="user._id !== userId"
          type="text"
          name="message"
          id="message"
          class="border-2 border-black w-60 mx-1 p-1"
          placeholder="Type a message"
          v-model="sendMessage"
          v-on:keyup.enter="send(user._id)"
        />
      </div>
    </div>
  </div>

  <!-- Notification -->
  <div class="border-2 border-black w-1/5 absolute bottom-1 right-1">
    <div>
      <div
        v-if="showNotif"
        @click="showUsers = !showUsers"
        class="p-1 border-b-2 border-gray-500 bg-gray-400 cursor-pointer hover:bg-blue-300"
      >
        Contact
        <span class="text-red-400 font-bold"> ({{ newMessage.length }}) </span>
      </div>
      <!-- List User -->
      <div v-if="showNotif && showUsers">
        <div
          v-for="(user, indexUser) in users"
          :key="indexUser"
          class="hover:bg-blue-200 cursor-pointer"
        >
          <div
            @click.prevent="chat(user)"
            v-if="user._id !== userId"
            class="p-1 flex flex-row justify-between"
          >
            {{ user.username }}
            <span
              v-if="
                userMessages[userMessages.findIndex(i => i.userId === user._id)]
                  .messages.length > 0
              "
              class="text-red-500 font-bold"
            >
              {{
                userMessages[userMessages.findIndex(i => i.userId === user._id)]
                  .messages.length
              }}
            </span>
          </div>
        </div>
      </div>

      <!-- <div
        v-if="showNotif"
        @click="showGroups = !showGroups"
        class="p-1 border-b-2 border-gray-500 bg-gray-400 cursor-pointer hover:bg-blue-300"
      >
        Group
      </div> -->
    </div>

    <div class="cursor-pointer bg-gray-300 p-1" @click="showNotif = !showNotif">
      Notifications
      <span class="text-red-400 font-bold"> ({{ newMessage.length }}) </span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import io from "socket.io-client";

export default {
  name: "Notification",
  data() {
    return {
      socket: io(process.env.VUE_APP_API_DOMAIN),
      messages: [],
      newMessage: [],
      sendMessage: "",
      showNotif: false,
      showUsers: false,
      showGroups: false,
      userChats: [],
      userMessages: []
    };
  },
  computed: {
    ...mapGetters({
      userId: "userId",
      users: "users"
    })
  },
  mounted() {
    this.getAllUser().then(() => {
      this.users.map(user => {
        this.userMessages.push({
          userId: user._id,
          messages: []
        });
        console.log(this.userMessages.findIndex(i => i.userId === user._id));
      });
      console.log(this.userMessages);
    });

    this.socket.emit("private", this.userId);
    this.socket.on(this.userId, data => {
      this.messages.push(data);
      if (data.receiverId === this.userId) {
        this.newMessage.push(data);
        this.userMessages[
          this.userMessages.findIndex(i => i.userId === data.senderId)
        ].messages.push(data);
      }
    });
  },
  methods: {
    ...mapActions(["getAllUser"]),
    send(receiverId) {
      const data = {
        senderId: this.userId,
        receiverId: receiverId,
        message: this.sendMessage
      };

      this.socket.emit("private", receiverId);
      this.socket.emit("send", data);
    },
    chat(user) {
      if (this.userChats.length <= 3) {
        let doubleChat = 0;
        this.userChats.map(userChat => {
          if (userChat._id === user._id) {
            doubleChat += 1;
          }
        });

        if (doubleChat === 0) {
          this.userChats.push(user);
        }
      }
    },
    cancel(index) {
      this.userChats.splice(index, 1);
    }
  }
};
</script>
<style scoped>
.overflow-scroll::-webkit-scrollbar {
  display: none;
}
</style>
