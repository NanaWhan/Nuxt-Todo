<template>
  <div class="dialog">
    <div class="dialog_content">
      <div class="dialog_head">
        <h2>{{ taskToEdit ? 'Edit Task' : 'Add New Task' }}</h2>
        <button @click="onClickCancel">
          <img src="../assets/icons/cancel.png" width="25" alt="close" />
        </button>
      </div>

      <div class="dialog_body">
        <label for="title">Task Title</label>
        <input type="text" id="title" v-model="title" />
        <span v-if="errors.title" class="error">{{ errors.title }}</span>

        <label for="description">Description</label>
        <input type="text" id="description" v-model="description" />
        <span v-if="errors.description" class="error">{{ errors.description }}</span>

        <label for="date">Expiry Date</label>
        <input type="date" id="date" v-model="date" />
        <span v-if="errors.date" class="error">{{ errors.date }}</span>

        <div class="form_action">
          <button class="btn" @click="submitForm">{{ taskToEdit ? 'Update' : 'Submit' }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { useTaskStore } from "@/stores/TaskStore";
import { defineEmits, defineProps } from "vue";
import { isBefore } from "date-fns"; 

const emit = defineEmits(["close"]);
const props = defineProps({
  taskToEdit: {
    type: Object,
    default: null
  },
});

const taskStore = useTaskStore();

const title = ref("");
const description = ref("");
const date = ref("");
const errors = ref({
  title: "",
  description: "",
  date: "",
});

onMounted(() => {
  if (props.taskToEdit) {
    title.value = props.taskToEdit.title;
    description.value = props.taskToEdit.description;
    date.value = props.taskToEdit.date;
  }
});

function validateForm() {
  let isValid = true;
  errors.value = { title: "", description: "", date: "" };

  if (!title.value) {
    errors.value.title = "Task title is required";
    isValid = false;
  }
  if (!description.value) {
    errors.value.description = "Description is required";
    isValid = false;
  }
  if (!date.value) {
    errors.value.date = "Expiry date is required";
    isValid = false;
  } else if (isBefore(new Date(date.value), new Date())) {
    errors.value.date = "Expiry date cannot be in the past";
    isValid = false;
  }

  return isValid;
}

function resetForm() {
  title.value = "";
  description.value = "";
  date.value = "";
}

function submitForm() {
  if (!validateForm()) return;

  const taskData = {
    title: title.value,
    description: description.value,
    date: date.value,
  };

  if (props.taskToEdit) {
    taskStore.editTask(taskStore.tasks.indexOf(props.taskToEdit), taskData); // Edit the existing task
  } else {
    taskStore.addTask(taskData); 
  }

  emit("close", true);
  resetForm();
}

function onClickCancel() {
  emit("close", false);
  resetForm();
}
</script>

<style scoped>
.error {
  color: red;
  font-size: 12px;
  margin-top: 4px;
}
</style>
