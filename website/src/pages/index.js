import React from 'react';
import Layout from '@theme/Layout';

import styles from './index.module.css';
import Ad from '../components/Ad';
import { sponsors, users } from '../data/indexData';

class HomeSplash extends React.Component {
  render() {
    const { siteConfig } = this.props;
    const { baseUrl } = siteConfig;

    const Logo = props => (
      <div className={styles.projectLogo}>
        <h1><img src={props.img_src} alt="Terser" /></h1>
      </div>
    );

    const ProjectTitle = () => (
      <h2 className="projectTitle">{siteConfig.tagline}</h2>
    );

    const ExplanatoryText = props => (
      <div className="explanatoryText">
        {props.children}
      </div>
    )

    return (
      <div className={styles.heroBanner}>
        <Logo img_src={`${baseUrl}img/terser-banner-logo.png`} />
        <div className="inner">
          <ProjectTitle siteConfig={siteConfig} />
        </div>
        <ExplanatoryText>
          <p>Terser is an industry-standard minifier for JavaScript code.</p>
          <p>It shrinks variable names, removes whitespace and comments, and can locate and remove unused code.</p>
          <p>You can use it through the <a href="/docs/cli-usage">Command line</a> or <a href="/docs/api-reference">Node.JS API</a>.</p>
        </ExplanatoryText>
      </div>
    );
  }
}

export default class Index extends React.Component {
  render() {
    const { config: siteConfig, language = '' } = this.props;

    const Section = props => <div className={styles.section}  style={{maxWidth: 890, padding: '2ch', margin: '0 auto' }} {...props} />;
    const Logos = props => <div className={styles.logos} {...props} />;

    const Showcase = () => {
      if (users.length === 0) {
        return null;
      }

      const showcase = users
        .filter(user => user.pinned)
        .map(user => (
          <a href={user.infoLink} key={user.infoLink}>
            <img src={user.image} alt={user.caption} title={user.caption} loading="lazy" />
          </a>
        ));

      return (
        <Section>
          <h2>Who is Using Terser?</h2>
          <Logos>{showcase}</Logos>
        </Section>
      );
    };

    const OCSponsors = () => {
      return (
        <Section>
          <h2>Code Contributors</h2>

          <p>This project exists thanks to all the people who contribute. [<a href="https://github.com/terser/terser/blob/master/CONTRIBUTING.md">Contribute</a>].</p>

          <p>
            <a href="https://github.com/terser/terser/graphs/contributors"><img src="https://opencollective.com/terser/contributors.svg?width=890&amp;button=false" /></a>
          </p>

          <h2>Individual Financial Contributors</h2>

          <p>Become a financial contributor and help us sustain our community. [<a href="https://opencollective.com/terser/contribute">Contribute</a>]</p>

          <p>
            <a href="https://opencollective.com/terser"><img src="https://opencollective.com/terser/individuals.svg?width=890" /></a>
          </p>

          <h2>Organization Financial Contributors</h2>

          <p>Support this project with your organization. Your logo will show up here with a link to your website. [<a href="https://opencollective.com/terser/contribute">Contribute</a>]</p>

          <p>
            <a href="https://opencollective.com/terser/organization/0/website"><img src="https://opencollective.com/terser/organization/0/avatar.svg" /></a>
            <a href="https://opencollective.com/terser/organization/1/website"><img src="https://opencollective.com/terser/organization/1/avatar.svg" /></a>
            <a href="https://opencollective.com/terser/organization/2/website"><img src="https://opencollective.com/terser/organization/2/avatar.svg" /></a>
            <a href="https://opencollective.com/terser/organization/3/website"><img src="https://opencollective.com/terser/organization/3/avatar.svg" /></a>
            <a href="https://opencollective.com/terser/organization/4/website"><img src="https://opencollective.com/terser/organization/4/avatar.svg" /></a>
            <a href="https://opencollective.com/terser/organization/5/website"><img src="https://opencollective.com/terser/organization/5/avatar.svg" /></a>
            <a href="https://opencollective.com/terser/organization/6/website"><img src="https://opencollective.com/terser/organization/6/avatar.svg" /></a>
            <a href="https://opencollective.com/terser/organization/7/website"><img src="https://opencollective.com/terser/organization/7/avatar.svg" /></a>
            <a href="https://opencollective.com/terser/organization/8/website"><img src="https://opencollective.com/terser/organization/8/avatar.svg" /></a>
            <a href="https://opencollective.com/terser/organization/9/website"><img src="https://opencollective.com/terser/organization/9/avatar.svg" /></a>
          </p>
        </Section>
      );
    }

    const Sponsors = () => {
      if (sponsors.length === 0) {
        return null;
      }

      const showcase = sponsors
        .filter(user => user.pinned)
        .map(user => (
          <a href={user.infoLink} key={user.infoLink}>
            <img
              src={user.image || '/img/placeholder.svg'}
              alt={user.caption}
              title={user.caption}
              loading="lazy"
            />
          </a>
        ));

      return (
        <Section>
          <h2>Patrons</h2>
          <Logos>{showcase}</Logos>
        </Section>
      );
    };

    return (
      <Layout>
        <HomeSplash siteConfig={siteConfig} language={language} />
        <div className="mainContainer">
          <div className={styles.centeredAd}><Ad /></div>
          <Showcase />
          <OCSponsors />
          <Sponsors />
        </div>
      </Layout>
    );
  }
}
