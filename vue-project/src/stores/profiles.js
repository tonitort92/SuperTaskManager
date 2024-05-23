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
      const { data: profile, error } = await supabase
        .from("profiles")
        .select("*")
        .eq('user_id', userId)
        .single();

      if (error && error.details !== "0 rows returned") {
        throw error;
      }
      this.profile = profile || null;
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
