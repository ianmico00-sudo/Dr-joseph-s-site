import Hero from '../sections/Hero.jsx';
import Bridge from '../sections/Bridge.jsx';
import ExploreGrid from '../sections/ExploreGrid.jsx';
import FeaturedWritings from '../sections/FeaturedWritings.jsx';
import Pillars from '../sections/Pillars.jsx';
import ImpactJourney from '../sections/ImpactJourney.jsx';
import MediaAppearances from '../sections/MediaAppearances.jsx';
import ContactCta from '../sections/ContactCta.jsx';

export default function Home() {
  return (
    <>
      <Hero />
      <Bridge />
      <ExploreGrid />
      <FeaturedWritings />
      <Pillars />
      <ImpactJourney />
      <MediaAppearances />
      <ContactCta />
    </>
  );
}
