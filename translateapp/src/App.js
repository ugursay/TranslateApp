import React, { useState } from "react";
import axios from "axios";

const languages = [
  { code: "en", name: "🇬🇧 English" },
  { code: "tr", name: "🇹🇷 Türkçe" },
  { code: "es", name: "🇪🇸 İspanyolca" },
  { code: "fr", name: "🇫🇷 Fransızca" },
  { code: "nl", name: "🇩🇪 Almanca" },
];

function App() {
  const [text, setText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [source, setSource] = useState("auto");
  const [target, setTarget] = useState("en");
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);

    setTimeout(async () => {
      try {
        const response = await axios.post("http://localhost:5000/translate", {
          q: text,
          source: source,
          target: target,
          format: "text",
          alternatives: 3,
          api_key: "",
        });
        setTranslatedText(response.data.alternatives);
      } catch (error) {
        console.log("Çeviri Yapılamadı: ", error);
        setTranslatedText("Çeviri başarısız.");
      }
      setLoading(false);
    }, 1000); // 500ms gecikme
  };

  return (
    <div className="font-sans min-h-screen bg-gradient-to-br from-gray-100 via-gray-350 to-gray-600 flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold text-purple-600 mb-8 drop-shadow-lg">
        🌍 Çeviri Uygulaması
      </h1>

      <div className="flex flex-col md:flex-row gap-6 w-full max-w-5xl">
        {/* GİRİŞ ALANI */}
        <div className="flex-1 bg-white rounded-2xl shadow-lg p-6">
          <label className="block text-sm font-semibold mb-2 text-gray-600">
            Kaynak Dil
          </label>
          <select
            className="w-full p-2 border rounded mb-4 bg-gray-50"
            value={source}
            onChange={(e) => setSource(e.target.value)}
          >
            <option value="auto">🌐 Otomatik</option>
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
          <textarea
            className="w-full h-40 p-3 border rounded bg-gray-50 resize-none"
            placeholder="Metni buraya yazın..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        {/* ÇIKIŞ ALANI */}
        <div className="flex-1 bg-white rounded-2xl shadow-lg p-6">
          <label className="block text-sm font-semibold mb-2 text-gray-600">
            Hedef Dil
          </label>
          <select
            className="w-full p-2 border rounded mb-4 bg-gray-50"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
          <textarea
            className="w-full h-40 p-3 border rounded bg-gray-100 resize-none"
            readOnly
            value={translatedText}
          />
        </div>
      </div>

      {/* BUTON */}
      <button
        onClick={handleClick}
        disabled={loading}
        className={`mt-8 px-8 py-3 rounded-full font-semibold text-lg transition-all duration-1000 ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:brightness-110"
        }`}
      >
        {loading ? (
          <span className="flex items-center gap-2">Çeviriliyor...</span>
        ) : (
          "🚀 Çevir"
        )}
      </button>
    </div>
  );
}

export default App;
