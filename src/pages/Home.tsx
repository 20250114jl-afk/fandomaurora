import NoticeBanner from '../components/NoticeBanner';
import Hero from '../components/Hero';
import Benefits from '../components/Benefits';
import ServiceDetails from '../components/ServiceDetails';
import Trust from '../components/Trust';
import ValueComparison from '../components/ValueComparison';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';

export default function Home() {
  return (
    <>
      <NoticeBanner />
      <Hero />
      <Benefits />
      <ServiceDetails />
      <Trust />
      <ValueComparison />
      <Testimonials />
      <FAQ />
    </>
  );
}

