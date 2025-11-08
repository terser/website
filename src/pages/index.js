import React from 'react';
import Layout from '@theme/Layout';
import cx from 'classnames';

import styles from './index.module.css';
import { openCollectiveSponsors, users } from '../data/indexData';

class HomeSplash extends React.Component {
  render() {
    const { siteConfig } = this.props;
    const { baseUrl } = siteConfig;

    const Logo = props => (
      <div className={styles.projectLogo}>
        <h1><img src={props.img_src} alt="Terser" width={900} height={274} style={{height: 'auto'}} /></h1>
      </div>
    );

    const FinancialDonors = () => (
      <div className={styles.financialDonors}>
        <h3>
          <a
            href="https://opencollective.com/terser"
            className={styles.financialDonorsButton}
          >
            Top recent financial contributors
          </a>
        </h3>
        {openCollectiveSponsors.map((sponsor, index) => (
            <a href={sponsor.infoLink} key={index}>
              {
                sponsor.image
                  ? (
                    <img
                      src={sponsor.image}
                      alt={sponsor.caption}
                      title={sponsor.caption}
                      className={styles.backerLogo}
                      loading="lazy"
                    />
                  )
                  : (
                    <span className={styles.backerNoLogo}>
                      {sponsor.caption}
                    </span>
                  )
              }
            </a>
        ))}
        <span />
      </div>
    );

    const TagLine = () => (
      <h2 className={cx(styles.tagLine)}>{siteConfig.tagline}</h2>
    );

    const ExplanatoryText = props => (
      <div className={styles.explanatoryText}>
        {props.children}
      </div>
    )

    return (
      <div className={cx(styles.homeContent, styles.heroBanner)}>
        <Logo img_src={`${baseUrl}img/terser-banner-logo.svg`} />
        <TagLine />
        <FinancialDonors />
        <ExplanatoryText>
          <p>Terser is an industry-standard minifier for JavaScript code.</p>
          <p>It shrinks variable names, removes whitespace and comments, and drops unused code.</p>
          <p>You can use it through the <a href="/docs/cli-usage">Command line</a> or <a href="/docs/api-reference">Node.JS API</a>.</p>
        </ExplanatoryText>
      </div>
    );
  }
}

export default class Index extends React.Component {
  render() {
    const { config: siteConfig, language = '' } = this.props;

    const HomeContent = props => <div className={styles.homeContent} {...props} />;
    const Logos = props => <p className={styles.logos} {...props} />;

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
        <>
          <h2>Who is Using Terser?</h2>
          <Logos>{showcase}</Logos>
        </>
      );
    };

    const OCSponsors = () => {
      return (
        <>
          <h2>Code Contributors</h2>

          <p>This project exists thanks to all the people who contribute. [<a href="https://github.com/terser/terser/blob/master/CONTRIBUTING.md">Contribute</a>].</p>

          <p>
            <a href="https://github.com/terser/terser/graphs/contributors"><img src="https://opencollective.com/terser/contributors.svg?width=890&amp;button=false" loading="lazy" /></a>
          </p>

          <h2>Individual Financial Contributors</h2>

          <p>Become a financial contributor and help us sustain our community. [<a href="https://opencollective.com/terser/contribute">Contribute</a>]</p>

          <p>
            <a href="https://opencollective.com/terser"><img src="https://opencollective.com/terser/individuals.svg?width=890" loading="lazy" /></a>
          </p>

          <h2>Organization Financial Contributors</h2>

          <p>Support this project with your organization. Your logo will show up here with a link to your website. [<a href="https://opencollective.com/terser/contribute">Contribute</a>]</p>

          <p>
            <a href="https://opencollective.com/terser/organization/0/website"><img src="https://opencollective.com/terser/organization/0/avatar.svg" loading="lazy" /></a>
            <a href="https://opencollective.com/terser/organization/1/website"><img src="https://opencollective.com/terser/organization/1/avatar.svg" loading="lazy" /></a>
            <a href="https://opencollective.com/terser/organization/2/website"><img src="https://opencollective.com/terser/organization/2/avatar.svg" loading="lazy" /></a>
            <a href="https://opencollective.com/terser/organization/3/website"><img src="https://opencollective.com/terser/organization/3/avatar.svg" loading="lazy" /></a>
            <a href="https://opencollective.com/terser/organization/4/website"><img src="https://opencollective.com/terser/organization/4/avatar.svg" loading="lazy" /></a>
            <a href="https://opencollective.com/terser/organization/5/website"><img src="https://opencollective.com/terser/organization/5/avatar.svg" loading="lazy" /></a>
            <a href="https://opencollective.com/terser/organization/6/website"><img src="https://opencollective.com/terser/organization/6/avatar.svg" loading="lazy" /></a>
            <a href="https://opencollective.com/terser/organization/7/website"><img src="https://opencollective.com/terser/organization/7/avatar.svg" loading="lazy" /></a>
            <a href="https://opencollective.com/terser/organization/8/website"><img src="https://opencollective.com/terser/organization/8/avatar.svg" loading="lazy" /></a>
            <a href="https://opencollective.com/terser/organization/9/website"><img src="https://opencollective.com/terser/organization/9/avatar.svg" loading="lazy" /></a>
          </p>
        </>
      );
    }

    return (
      <Layout>
        <HomeSplash siteConfig={siteConfig} language={language} />
        <HomeContent>
          <Showcase />
          <OCSponsors />
        </HomeContent>
      </Layout>
    );
  }
}
