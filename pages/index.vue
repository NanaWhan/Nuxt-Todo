<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useTaskStore } from '@/stores/TaskStore';
import AddTask from '@/components/AddTask.vue';
import TaskCard from '@/components/TaskCard.vue';

const showDialog = ref(false);
const taskStore = useTaskStore();

onMounted(() => {
  taskStore.fetchTasks();
});

function toggleDialog() {
  showDialog.value = !showDialog.value;
}

const activeTasks = computed(() => taskStore.tasks.filter(task => !task.completed));
const completedTasks = computed(() => taskStore.tasks.filter(task => task.completed));
</script>

<template>
  <div class="todo_wrapper">
    <!-- Display loading state -->
    <div v-if="taskStore.loading">Loading tasks...</div>
    <div v-if="taskStore.error">Error loading tasks: {{ taskStore.error }}</div>

    <div class="todo_task-list" v-else>
      <div class="todo_add">
        <button class="btn" @click="toggleDialog">Add a new task</button>
      </div>

      <h3>Active Tasks</h3>
      <div v-if="activeTasks.length > 0">
        <task-card 
          v-for="(task, index) in activeTasks" 
          :key="index" 
          :task="task" 
          @toggleComplete="taskStore.toggleTaskCompletion(index)"
          @deleteTask="taskStore.removeTask(index)"
        />
      </div>
      <p v-else>No active tasks available.</p>

      <h3>Completed Tasks</h3>
      <div v-if="completedTasks.length > 0">
        <task-card 
          v-for="(task, index) in completedTasks" 
          :key="index" 
          :task="task" 
          @toggleComplete="taskStore.toggleTaskCompletion(index)"
          @deleteTask="taskStore.removeTask(index)"
        />
      </div>
      <p v-else>No completed tasks available.</p>
    </div>

    <add-task v-if="showDialog" @close="toggleDialog" />
  </div>
</template>
