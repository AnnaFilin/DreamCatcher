import { themeFonts } from "../utils/themeTokens";
import { useTranslation } from "react-i18next";

import PageHeader from "../layout/PageHeader";
import PageWrapper from "../layout/PageWrapper";

const About = () => {
  const { t } = useTranslation();

  return (
    <PageWrapper>
      <PageHeader title={t("about.title")} />

      <div className={`${themeFonts.subtitle} space-y-4`}>
        {t("about.description")
          .split("\n\n")
          .map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
      </div>
      {/* <div className={`${themeFonts.subtitle} space-y-4`}>
        <p>
          <strong>Dream Snippets</strong> is a digital space for quietly
          observing the language of dreams. It’s designed to help you record
          fragments before they disappear, notice recurring patterns, and slowly
          build an archive of your inner world.
        </p>

        <p>
          Each night, something ancient speaks to us in images — unpredictable,
          strange, or deeply symbolic. By writing them down, you not only
          remember, but begin to see. Patterns emerge. Emotions reappear.
          Symbols repeat in ways that suggest meaning, even when logic fails to
          explain it.
        </p>

        <p>
          This tool offers a minimal, ambient interface that stays out of the
          way. It's not designed to analyze or interpret for you. Instead, it
          supports your own process of reflection and attention — encouraging
          gentle consistency rather than pressure.
        </p>

        <p>
          For those practicing lucid dreaming, Dream Snippets can serve as a
          practical companion — anchoring your awareness, training your recall,
          and helping you notice signals from the subconscious. For others, it
          may simply become a quiet ritual of self-observation.
        </p>

        <p>
          Motifs can be tagged and revisited over time. Their interpretation
          draws loosely from Jungian archetypes, inviting symbolic exploration
          rather than rigid categories. In this way, the journal becomes not
          only a record of dreams, but a mirror of psychological movement.
        </p>

        <p>
          Above all, Dream Snippets is an invitation: to slow down, to notice,
          to return. With each entry, you leave a breadcrumb trail through your
          own unconscious — and perhaps, over time, begin to see yourself more
          clearly.
        </p>
      </div> */}
    </PageWrapper>
  );
};
export default About;
