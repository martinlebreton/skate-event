/**
 * Gère une erreur Supabase de façon centralisée
 * - Log en console avec contexte
 * - Retourne un message lisible pour l'utilisateur
 */
export function handleSupabaseError(error, context = "") {
  if (!error) return null;

  const prefix = context ? "[" + context + "] " : "";
  console.error("Supabase error " + prefix, error);

  // Messages d'erreur lisibles selon le code
  const errorMessages = {
    23505: "Cette entrée existe déjà.",
    23503: "Référence invalide — élément lié introuvable.",
    42501: "Permission refusée — vérifiez vos droits.",
    PGRST116: "Aucun résultat trouvé.",
  };

  return (
    errorMessages[error.code] || error.message || "Une erreur est survenue."
  );
}

/**
 * Wrapper pour les requêtes Supabase
 * Retourne { data, error, message }
 * message = message lisible si erreur
 */
export async function supabaseQuery(queryFn, context = "") {
  try {
    const { data, error } = await queryFn();
    if (error) {
      const message = handleSupabaseError(error, context);
      return { data: null, error, message };
    }
    return { data, error: null, message: null };
  } catch (err) {
    console.error("Unexpected error [" + context + "]:", err);
    return {
      data: null,
      error: err,
      message: "Une erreur inattendue est survenue.",
    };
  }
}
