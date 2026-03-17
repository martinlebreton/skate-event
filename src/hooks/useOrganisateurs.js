import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { supabaseQuery } from "../utils/supabaseHelpers";

export function useOrganisateurs() {
  const [organisateurs, setOrganisateurs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    fetchOrganisateurs();
  }, []);

  async function fetchOrganisateurs() {
    setLoading(true);
    setFetchError(null);
    const { data, message } = await supabaseQuery(
      () =>
        supabase
          .from("organisateurs")
          .select("*")
          .order("nom", { ascending: true }),
      "fetchOrganisateurs",
    );
    if (data) setOrganisateurs(data);
    else setFetchError(message);
    setLoading(false);
  }

  async function createOrganisateur(form) {
    const { error, message } = await supabaseQuery(
      () =>
        supabase.from("organisateurs").insert([
          {
            ...form,
            region: form.region || null,
          },
        ]),
      "createOrganisateur",
    );
    if (!error) await fetchOrganisateurs();
    return error ? { message } : null;
  }

  async function updateOrganisateur(id, form) {
    const { error, message } = await supabaseQuery(
      () =>
        supabase
          .from("organisateurs")
          .update({
            ...form,
            region: form.region || null,
          })
          .eq("id", id),
      "updateOrganisateur",
    );
    if (!error) await fetchOrganisateurs();
    return error ? { message } : null;
  }

  async function deleteOrganisateur(id) {
    const { error, message } = await supabaseQuery(
      () => supabase.from("organisateurs").delete().eq("id", id),
      "deleteOrganisateur",
    );
    if (!error) await fetchOrganisateurs();
    return error ? { message } : null;
  }

  return {
    organisateurs,
    loading,
    fetchError,
    fetchOrganisateurs,
    createOrganisateur,
    updateOrganisateur,
    deleteOrganisateur,
  };
}
