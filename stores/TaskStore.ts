import { defineStore } from 'pinia';
import { ref } from 'vue';

interface Task {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    tasks: [] as Task[],
    loading: ref(false),
    error: ref<string | null>(null),
  }),
  actions: {
    async fetchTasks() {
      this.loading = true;
      this.error = null;
      try {
        const response = await fetch('https://dummyjson.com/todos');
        const data = await response.json();

        this.tasks = data.todos.map((todo: any) => ({
          id: todo.id,
          title: todo.todo, 
          description: '',   
          date: new Date().toISOString(), 
          completed: todo.completed,
        }));
      } catch (err) {
        this.error = 'Failed to fetch tasks';
      } finally {
        this.loading = false;
      }
    },
    addTask(task: { title: string; description: string; date: string }) {
      const newTask = {
        id: this.tasks.length ? this.tasks[this.tasks.length - 1].id + 1 : 1,
        todo: task.title,
        completed: false,
        userId: 1, 
        description: task.description,
        date: task.date,
        createdAt: new Date().toISOString(), // Creation date
      };
      this.tasks.push(newTask);
    },
    editTask(index: number, updatedTask: Task) {
      this.tasks[index] = updatedTask; 
    },
    toggleTaskCompletion(index: number) {
      this.tasks[index].completed = !this.tasks[index].completed;
    },
    removeTask(index: number) {
      this.tasks.splice(index, 1);
    },
  },
});
