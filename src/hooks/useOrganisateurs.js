import { useState } from "react";
import { supabase } from "../supabaseClient";

export function useOrganisateurs() {
  const [organisateurs, setOrganisateurs] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchOrganisateurs() {
    setLoading(true);
    const { data, error } = await supabase
      .from("organisateurs")
      .select("*")
      .order("nom", { ascending: true });
    if (error) console.error("Erreur fetchOrganisateurs :", error);
    else setOrganisateurs(data);
    setLoading(false);
  }

  async function createOrganisateur(form) {
    const { error } = await supabase.from("organisateurs").insert([
      {
        ...form,
        region: form.region || null,
      },
    ]);
    if (!error) await fetchOrganisateurs();
    return error;
  }

  async function updateOrganisateur(id, form) {
    const { error } = await supabase
      .from("organisateurs")
      .update({
        ...form,
        region: form.region || null,
      })
      .eq("id", id);
    if (!error) await fetchOrganisateurs();
    return error;
  }

  async function deleteOrganisateur(id) {
    const { error } = await supabase
      .from("organisateurs")
      .delete()
      .eq("id", id);
    if (!error) await fetchOrganisateurs();
    return error;
  }

  return {
    organisateurs,
    loading,
    fetchOrganisateurs,
    createOrganisateur,
    updateOrganisateur,
    deleteOrganisateur,
  };
}
