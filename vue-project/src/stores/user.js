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
      if (error) {
        console.error('Error fetching user:', error);
        throw error;
      }
      if (data.user) {
        this.user = data.user;
        console.log('User stored:', this.user);
      } else {
        console.error('No user found in fetchUser');
        throw new Error('No user found');
      }
    },
    async signUp(email, password) {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password
      });
      if (error) {
        console.error('Error during sign up:', error);
        throw error;
      }
      if (data.user) {
        this.user = data.user;
        try {
          await this.createProfile(email);
        } catch (profileError) {
          console.error('Error creating profile:', profileError);
          // Opcional: Borrar el usuario si la creación del perfil falla
          await supabase.auth.admin.deleteUser(data.user.id);
          throw profileError;
        }
      } else {
        console.error('No user returned during sign up');
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
        console.error('Error inserting profile:', error);
        throw error;
      }
    },
    async signIn(email, password) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (error) {
        console.error('Error during sign in:', error);
        throw error;
      }
      if (data.user) {
        this.user = data.user;
        console.log('User signed in:', this.user);
      } else {
        console.error('No user found during sign in');
        throw new Error('No user found');
      }
    },
    async logOut() {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Error during log out:', error);
        throw error;
      }
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
