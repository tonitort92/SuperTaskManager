// /store/user.js
import { defineStore } from 'pinia';
import { supabase } from '../supabase';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
  }),

  actions: {
    async fetchUser() {
      const { data: user, error } = await supabase.auth.getUser();
      if (error) throw error;
      if (user) {
        this.user = user;
        console.log('User stored:', this.user);  // Verifica la estructura aquí
      }
    },
    async signUp(email, password) {
      const { user, error } = await supabase.auth.signUp({
        email: email,
        password: password
      });
      if (error) throw error;
      if (user) {
        this.user = user;
        const { data, error: insertError } = await supabase
          .from('profiles')
          .insert([{ user_id: user.id, email: email }]);
        if (insertError) throw insertError;
      }
    },
    async signIn(email, password) {
      const { user, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (error) throw error;
      if (user) this.user = user;
   },
    async logOut() {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      this.user = null;
    },
  },

  persist: {
    enabled: true,
    strategies: [
      { key: 'user', storage: localStorage }
    ]
  }
});
