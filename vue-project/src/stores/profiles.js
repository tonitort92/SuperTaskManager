import { defineStore } from "pinia";
import { supabase } from "../supabase";

export const useProfileStore = defineStore("profiles", {
  state: () => ({
    profile: null,
  }),
  actions: {
    async fetchProfiles(userId) {
      console.log(userId);
      if (!userId) {
        throw new Error('User ID is required to fetch your profile.');
      }
      const { data: profile, error } = await supabase
        .from("profiles")
        .select("*")
        .eq('user_id', userId);

      if (error) {
        throw error;
      }
      this.profile = profile[0];
      console.log(profile[0])
    },

    async createProfile(profileId, profile) {
      const { error } = await supabase
        .from("profiles")
        .insert(profile)
        .eq('user_id', profileId);
      if (error) {
        console.error("Error from Supabase:", error);
        throw error;
      }


    },

    async updateProfile(profileId, profile) {
        const { error } = await supabase
          .from("profiles")
          .update(profile)
          .eq('user_id', profileId);
  
        if (error) {
          console.error("Error from Supabase:", error);
          throw error;
        }
  

      }
    },
});