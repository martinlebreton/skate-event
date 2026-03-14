import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export function useEnums() {
  const [regions, setRegions] = useState([]);
  const [types, setTypes] = useState([]);
  const [typesOrg, setTypesOrg] = useState([]);
  const [statutsOrg, setStatutsOrg] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEnums() {
      const { data, error } = await supabase.rpc("get_enums");
      if (error) {
        console.error("Erreur chargement enums :", error);
      } else {
        setRegions(
          data
            .filter((e) => e.enum_name === "event_region")
            .map((e) => e.value),
        );
        setTypes(
          data.filter((e) => e.enum_name === "event_type").map((e) => e.value),
        );
        setTypesOrg(
          data
            .filter((e) => e.enum_name === "type_organisation")
            .map((e) => e.value),
        );
        setStatutsOrg(
          data
            .filter((e) => e.enum_name === "statut_organisateur")
            .map((e) => e.value),
        );
      }
      setLoading(false);
    }
    fetchEnums();
  }, []);

  return { regions, types, typesOrg, statutsOrg, loading };
}
