import { defineStore } from 'pinia';

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    tasks: [] as Array<{ title: string; description: string; date: string, completed: boolean }>,
  }),
  actions: {
    addTask(task: { title: string; description: string; date: string }) {
      // Adding 'completed' field to track task status
      this.tasks.push({ ...task, completed: false });
    },
    toggleTaskCompletion(index: number) {
      this.tasks[index].completed = !this.tasks[index].completed;
    },
    removeTask(index: number) {
      this.tasks.splice(index, 1); // Remove a task by index
    }
  },
});
