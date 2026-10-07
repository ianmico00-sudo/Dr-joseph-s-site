import PageHero from '../components/PageHero.jsx';
import ButtonLink from '../components/ButtonLink.jsx';

export default function NotFound() {
  return (
    <>
      <PageHero eyebrow="Page not found" title="This page does not exist." lede="The link may be out of date, or the page may have moved." />
      <section className="pb-24 bg-background">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
          <ButtonLink to="/">Back to the homepage</ButtonLink>
        </div>
      </section>
    </>
  );
}
