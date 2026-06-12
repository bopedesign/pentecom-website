import React from 'react';
import Hero from './Hero.jsx';
import SolutionsHome1 from './SolutionsHome1.jsx';
import { WhyUs3, Proof3, ProofStats13, useInView3 } from './HomeSectionsA.jsx';
import { Industries3, News3, Contact3 } from './HomeSectionsB.jsx';

export default function HomeContent() {
  useInView3();

  return (
    <React.Fragment>
      <Hero mixedWeight={true} />
      <SolutionsHome1 />
      <WhyUs3 />
      <Industries3 />
      <ProofStats13 />
      <Proof3 />
      <News3 />
      <Contact3 />
    </React.Fragment>
  );
}
