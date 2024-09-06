<template>
  <div class="task_card mt-5" :class="task.completed ? 'border-complete' : 'border-active'">
    <div class="task_card_head p-5 pb-2">
      <div class="task_card_action text-light info-text">
        <span @click="$emit('editTask', task)">Edit</span> 
        <span @click="$emit('deleteTask')">Delete</span>
        <span @click="$emit('toggleComplete')">
          {{ task.completed ? 'Mark as Active' : 'Complete' }}
        </span>
      </div>
      <p class="task_card_title">{{ task.title }}</p>
      <p class="text-light info-text">Created on: {{ task.date }}</p>
    </div>
    <div class="task_card_footer">
      <p class="mt-1 text-light">{{ task.description }}</p>
      <div class="task_card_meta text-light info-text">
        <p>Expiring on: {{ task.date ? new Date(task.date).toLocaleDateString() : 'No expiry date' }}</p>
        <img
          src="https://img.icons8.com/?size=100&id=20750&format=png&color=000000"
          class="avatar"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  task: {
    type: Object,
    required: true
  }
});
</script>
