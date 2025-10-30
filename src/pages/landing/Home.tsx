import Hero from '../../components/landing/Hero';
import Footer from '../../components/common/Footer';
import PageTransition from '../../components/common/PageTransition';

export default function Home() {
  return (
    <PageTransition>
      <>
        <Hero />
        <Footer />
      </>
    </PageTransition>
  );
}
