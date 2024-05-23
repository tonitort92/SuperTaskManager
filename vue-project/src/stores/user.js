import { defineStore } from 'pinia';
import { supabase } from '../supabase';
import { useProfileStore } from './profiles';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
  }),

  actions: {
    async fetchUser() {
      const { data, error } = await supabase.auth.getUser();
      if (error) throw error;
      if (data.user) {
        this.user = data.user;
        console.log('User stored:', this.user);
      }
    },
    async signUp(email, password) {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password
      });
      if (error) throw error;
      if (data.user) {
        this.user = data.user;
        try {
          await this.createProfile(email);
        } catch (profileError) {
          console.error('Error creating profile:', profileError);
          // Opcional: Borrar el usuario si la creación del perfil falla
          await supabase.auth.api.deleteUser(data.user.id);
          throw profileError;
        }
      }
    },
    async createProfile(email) {
      const profileData = {
        user_id: this.user.id,
        email: email
      };
      const { error } = await supabase
        .from('profiles')
        .insert([profileData]);
      if (error) {
        throw error;
      }
    },
    async signIn(email, password) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (error) throw error;
      if (data.user) {
        this.user = data.user;
        console.log('User signed in:', this.user);
      }
    },
    async logOut() {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      this.user = null;
      useProfileStore().profile = null;
    },
  },

  persist: {
    enabled: true,
    strategies: [
      { key: 'user', storage: localStorage }
    ]
  }
});
