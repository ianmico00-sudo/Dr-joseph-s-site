import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Reveal from '../components/Reveal.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import ButtonLink from '../components/ButtonLink.jsx';
import ArticleCard from '../components/ArticleCard.jsx';
import { ARTICLES } from '../lib/articles.js';
import { recentAppearances } from '../lib/media.js';
import { formatDate } from '../lib/format.js';
import home from '../content/home.json';

// All of the text and photos on this page come from src/content/home.json.
const { hero, bridge, explore, featured, pillars, journey, appearances, cta } = home;
const ROLES = hero.roles;

const CONTAINER = 'max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16';
const EYEBROW = 'text-[11px] tracking-[0.3em] uppercase text-ochre font-medium';
// Stagger for items in a 3-column grid: 1, 2, 3, 1, 2, 3…
const stagger = (i, columns = 3) => (i % columns) + 1;

function RoleRotator() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % ROLES.length), 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mt-7 flex items-center gap-3">
      <span className="block w-2 h-2 rounded-full bg-ochre animate-pulse-soft" />
      <div className="relative h-7 overflow-hidden" aria-live="off">
        {ROLES.map((role, i) => (
          <div
            key={role}
            aria-hidden={i !== index}
            className={`absolute inset-0 font-display text-lg md:text-xl text-oxford/90 whitespace-nowrap transition-all duration-700 ${
              i === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
            }`}
          >
            {role}
          </div>
        ))}
        {/* Invisible copy of the longest role keeps the width steady */}
        <span className="invisible font-display text-lg md:text-xl whitespace-nowrap">
          {ROLES.reduce((longest, role) => (role.length > longest.length ? role : longest), '')}
        </span>
      </div>
    </div>
  );
}

// Slideshow of portrait photos with crossfade transition and dot indicators.
// Falls back gracefully to a single static photo when only one image is provided.
function PortraitSlideshow({ images, alt }) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (images.length <= 1 || paused) return;
    const timer = setInterval(() => setCurrent((i) => (i + 1) % images.length), 4500);
    return () => clearInterval(timer);
  }, [images.length, paused]);

  return (
    <div
      className="relative aspect-[4/5] overflow-hidden bg-muted"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={i === 0 ? alt : ''}
          aria-hidden={i !== current}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1200ms] ease-in-out ${
            i === current ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-oxford/20 to-transparent pointer-events-none" />
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => { setCurrent(i); setPaused(true); }}
              aria-label={`Photo ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === current ? 'w-5 bg-background' : 'w-1.5 bg-background/40 hover:bg-background/70'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

const PORTRAITS = hero.portraits?.length ? hero.portraits : [hero.portrait];

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflo
