"use client";

import {
  HomeDataProvider,
} from "./HomeDataContext";

import Hero from "./Hero";
import About from "./About";
import Counters from "./Counters";
import Projects from "./Projects";
import Testimonials from "./Testimonials";
import Blog from "./Blog";

export default function HomeClient() {
  return (
    <HomeDataProvider>
      <main>
        <Hero
          ready={true}
        />

        <About />

        <Counters />

        <Projects />

        <Testimonials />

        <Blog />
      </main>
    </HomeDataProvider>
  );
}