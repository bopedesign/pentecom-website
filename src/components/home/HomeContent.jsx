import React, { useEffect } from 'react';
import { Hero3, WhyUs3, Proof3, ProofStats13, Solutions3, useInView3 } from './HomeSectionsA.jsx';
import { Industries3, News3, Contact3 } from './HomeSectionsB.jsx';

export default function HomeContent() {
  useInView3();

  return (
    <React.Fragment>
      <Hero3 showDocs={true} mixedWeight={true} videoSrc={null} heroImageSrc={null} docsVariant="stack" />
      <Solutions3 />
      <WhyUs3 />
      <Industries3 />
      <ProofStats13 />
      <Proof3 />
      <News3 />
      <Contact3 />
    </React.Fragment>
  );
}
