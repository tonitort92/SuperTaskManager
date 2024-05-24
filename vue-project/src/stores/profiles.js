import { defineStore } from "pinia";
import { supabase } from "../supabase";

export const useProfileStore = defineStore("profiles", {
  state: () => ({
    profile: null,
  }),
  actions: {
    async fetchProfiles(userId) {
      if (!userId) {
        throw new Error('User ID is required to fetch your profile.');
      }
      const { data: profiles, error } = await supabase
        .from("profiles")
        .select("*")
        .eq('user_id', userId);

      if (error) {
        throw error;
      }
      this.profile = profiles.length > 0 ? profiles[0] : null;
    },

    async createProfile(profile) {
      const { data, error } = await supabase
        .from("profiles")
        .insert(profile)
        .single();

      if (error) {
        throw error;
      }
      this.profile = data;
    },

    async updateProfile(profileId, profile) {
      const { data, error } = await supabase
        .from("profiles")
        .update(profile)
        .eq('user_id', profileId)
        .single();

      if (error) {
        throw error;
      }
      this.profile = data;
    }
  },
});
