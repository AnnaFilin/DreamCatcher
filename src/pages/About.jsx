import { themeFonts } from "../utils/themeTokens";
import { useTranslation } from "react-i18next";

import PageHeader from "../layout/PageHeader";
import PageWrapper from "../layout/PageWrapper";

const About = () => {
  const { t } = useTranslation();

  return (
    <PageWrapper>
      <div className="relative z-10">
        <PageHeader title={t("about.title")} />

        <div className={`${themeFonts.subtitle} space-y-4`}>
          {t("about.description")
            .split("\n\n")
            .map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
        </div>
      </div>
    </PageWrapper>
  );
};
export default About;
