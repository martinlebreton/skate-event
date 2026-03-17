import { useState } from "react";
import { supabase } from "../../supabaseClient";

function ImageUpload({ onUpload }) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(null);

  async function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    // Vérifie que c'est bien une image
    if (!file.type.startsWith("image/")) {
      alert("Merci de sélectionner une image.");
      return;
    }

    // Affiche un aperçu local immédiatement
    setPreview(URL.createObjectURL(file));
    setUploading(true);

    // Génère un nom de fichier unique
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;

    // Upload dans Supabase Storage
    const { error } = await supabase.storage
      .from("events-images")
      .upload(fileName, file);

    if (error) {
      console.error("Erreur upload :", error);
      alert("Erreur lors de l'upload");
      setPreview(null);
    } else {
      // Récupère l'URL publique de l'image
      const { data } = supabase.storage
        .from("events-images")
        .getPublicUrl(fileName);

      // Remonte l'URL au composant parent (Admin)
      onUpload(data.publicUrl);
    }

    setUploading(false);
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Image
      </label>

      {/* Aperçu de l'image */}
      {preview && (
        <div className="mb-3">
          <img
            src={preview}
            alt="Aperçu"
            className="w-full h-48 object-cover rounded-xl"
          />
        </div>
      )}

      {/* Zone de sélection */}
      <label
        className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl cursor-pointer transition-colors ${
          uploading
            ? "border-gray-200 bg-gray-50"
            : "border-gray-300 bg-white hover:border-blue-400 hover:bg-blue-50"
        }`}
      >
        <span className="text-2xl mb-1">{uploading ? "⏳" : "📷"}</span>
        <span className="text-sm text-gray-500">
          {uploading
            ? "Upload en cours..."
            : "Clique pour sélectionner une image"}
        </span>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={uploading}
          className="hidden"
        />
      </label>
    </div>
  );
}

export default ImageUpload;
