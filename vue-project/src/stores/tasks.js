import { defineStore } from "pinia";
import { supabase } from "../supabase";

export const useTaskStore = defineStore("tasks", {
  state: () => ({
    tasks: [],
  }),
  actions: {
    async fetchTasks(userId) {
      if (!userId) {
        throw new Error('User ID is required to fetch tasks.');
      }
      const { data: tasks, error } = await supabase
        .from("tasks")
        .select("*")
        .eq('user_id', userId)
        .order("id", { ascending: false });

      if (error) {
        throw error;
      }

      this.tasks = tasks;
    },

    async pushTask({ title, description, tag, area, inserted_at, user_id }) {
      const { data, error } = await supabase
        .from("tasks")
        .insert([{ user_id, title, description, tag, area, inserted_at }]);

      if (error) {
        throw error;
      }

      if (data) {
        this.tasks.push(data[0]);
      }
    },

    async updateTask(taskId, task) {
      const { data, error } = await supabase
        .from("tasks")
        .update(task)
        .eq('id', taskId);

      if (error) {
        console.error("Error from Supabase:", error);
        throw error;
      }

      // Update the task in the local state
      const taskIndex = this.tasks.findIndex(t => t.id === taskId);
      if (taskIndex !== -1) {
        this.tasks[taskIndex] = { ...this.tasks[taskIndex], ...task };
      }
    },
    
    async deleteTask(taskId) {
      const { data, error } = await supabase
        .from("tasks")
        .delete()
        .eq('id', taskId);
    
      if (error) {
        throw error;
      }
    
      if (data) {
        this.tasks = this.tasks.filter(task => task.id !== taskId);
      }
    }
  },
});
