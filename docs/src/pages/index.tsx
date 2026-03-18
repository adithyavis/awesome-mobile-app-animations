import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

const animations = [
  {
    app: 'Threads',
    title: 'Spoiler Masking',
    description:
      'Animated particle mask over spoiler text using a Skia RuntimeEffect shader with tap-to-reveal.',
    tech: ['reanimated', 'skia'],
    docLink: '/docs/animations/threads-spoiler-masking',
    youtubeId: '30qn0e2zHNo',
  },
  {
    app: 'Wolt',
    title: 'Frost Creep Image Loading',
    description:
      'GPU-accelerated frost creep reveal effect using Skia shaders.',
    tech: ['reanimated', 'skia'],
    docLink: '/docs/animations/wolt-shop-loading',
    youtubeId: 'cZBs7ur75Dk',
  },
  {
    app: 'Duolingo',
    title: 'Drag Sort Words',
    description:
      'Drag-and-drop word sorting with gesture handling and displacement animations.',
    tech: ['reanimated', 'gesture-handler'],
    docLink: '/docs/animations/duolingo-drag-sort',
    youtubeId: '-KX4BDmUdN8',
  },
  {
    app: 'Threads',
    title: 'Pull to Refresh',
    description: 'Custom pull-to-refresh with Lottie logo animation.',
    tech: ['reanimated', 'lottie'],
    docLink: '/docs/animations/threads-pull-to-refresh',
    youtubeId: '9Zi5wbfT-Mk',
  },
  {
    app: 'Stocks',
    title: 'Chart Animation',
    description:
      'Animated stock chart with grid lines and trajectory drawn using Skia.',
    tech: ['skia', 'reanimated'],
    docLink: '/docs/animations/stocks-chart',
    youtubeId: 'KC_Z-5sVTAU',
  },
  {
    app: 'YouTube Music',
    title: 'Swipe Bg Transition',
    description:
      'Smooth 60fps carousel background color transitions on the native thread.',
    tech: ['skia', 'reanimated'],
    docLink: '/docs/animations/youtube-music-transition',
    youtubeId: 'u8-dyjjUIio',
  },
];

function AnimationCard({
  app,
  title,
  description,
  tech,
  docLink,
  youtubeId,
}: (typeof animations)[number]) {
  return (
    <div className={clsx('col col--4', styles.animationCol)}>
      <div className={styles.animationCard}>
        <div className={styles.videoWrapper}>
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}`}
            title={`${app} - ${title}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <div className={styles.cardContent}>
          <Heading as="h3">{app}</Heading>
          <p className={styles.cardTitle}>{title}</p>
          <p className={styles.cardDescription}>{description}</p>
          <div className={styles.techTags}>
            {tech.map((t) => (
              <span key={t} className={styles.techTag}>
                {t}
              </span>
            ))}
          </div>
          <Link className="button button--primary button--sm" to={docLink}>
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro"
          >
            Explore Animations
          </Link>
          <Link
            className="button button--outline button--secondary button--lg"
            href="https://github.com/adithyavis/awesome-mobile-app-animations"
            style={{ marginLeft: '1rem' }}
          >
            GitHub
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title="Home" description={siteConfig.tagline}>
      <HomepageHeader />
      <main>
        <section className={styles.animations}>
          <div className="container">
            <div className="row">
              {animations.map((anim) => (
                <AnimationCard key={anim.docLink} {...anim} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
