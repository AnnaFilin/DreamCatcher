import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function DirectionManager() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const lang = i18n.language;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "he" ? "rtl" : "ltr";

    if (lang === "he") {
      document.body.classList.add("font-rubik");
    } else {
      document.body.classList.remove("font-rubik");
    }
  }, [i18n.language]);

  return null;
}
