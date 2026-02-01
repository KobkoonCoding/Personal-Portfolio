import { Timeline } from '../components/Timeline'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useTranslation } from 'react-i18next'

const Experience = () => {
  const { t } = useTranslation()
  const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.1, once: true });
  const translatedExperiences = t('experiences', { returnObjects: true });

  return (
    <div
      ref={sectionRef}
      id="work"
      className={`relative w-full c-space section-spacing scroll-reveal-scale ${isVisible ? 'visible' : ''}`}
    >
      <h2 className="text-heading mb-12">{t('nav.work')}</h2>
      <Timeline data={Array.isArray(translatedExperiences) ? translatedExperiences : []} />
    </div>
  )
}

export default Experience