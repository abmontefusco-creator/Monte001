import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      it: {
        translation: {
          welcome: "Benvenuto!",
          totale_contatti: "Totale contatti",
          kpi_strategici: "KPI Strategici",
          tasso_conversione: "Tasso di Conversione",
          redditivita_progetti: "Redditività Progetti",
          soddisfazione_clienti: "Soddisfazione Clienti"
        }
      }
    },
    lng: "it",
    fallbackLng: "it",
    interpolation: { escapeValue: false }
  });

export default i18n;
