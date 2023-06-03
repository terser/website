const React = require('react');

class HomeSplash extends React.Component {
  render() {
    const { siteConfig } = this.props;
    const { baseUrl } = siteConfig;

    const SplashContainer = props => (
      <div className="homeContainer">
        <div className="homeSplashFade">
          <div className="wrapper homeWrapper">{props.children}</div>
        </div>
      </div>
    );

    const Logo = props => (
      <div className="projectLogo">
        <h1><img src={props.img_src} alt="Terser" /></h1>
      </div>
    );

    const ProjectTitle = () => (
      <h2 className="projectTitle">{siteConfig.tagline}</h2>
    );

    const PromoSection = props => (
      <div className="section promoSection">
        <div className="promoRow">
          <div className="pluginRowBlock">{props.children}</div>
        </div>
      </div>
    );

    const Button = props => (
      <div className="pluginWrapper buttonWrapper">
        <a className="button" href={props.href} target={props.target}>
          {props.children}
        </a>
      </div>
    );

    const ExplanatoryText = props => (
      <div className="explanatoryText">
        {props.children}
      </div>
    )

    return (
      <SplashContainer>
        <Logo img_src={`${baseUrl}img/terser-banner-logo.png`} />
        <div className="inner">
          <ProjectTitle siteConfig={siteConfig} />
          <PromoSection>
            <Button href="https://try.terser.org">Try It Out</Button>
          </PromoSection>
        </div>
        <ExplanatoryText>
          <p>Terser is an industry-standard minifier for JavaScript code.</p>
          <p>It removes comments, makes variable names smaller, and removes whitespace.</p>
          <p>Readable and maintainable code patterns are replaced with smaller code.</p>
          <p>Some variable references and function calls can be inlined into the places they're used.</p>
          <p>You can use it through the <a href="/docs/cli-usage">Command line</a> or <a href="/docs/api-reference">Node.JS API</a>.</p>
        </ExplanatoryText>
      </SplashContainer>
    );
  }
}

class Index extends React.Component {
  render() {
    const { config: siteConfig, language = '' } = this.props;
    const { baseUrl } = siteConfig;

    const Showcase = () => {
      if ((siteConfig.users || []).length === 0) {
        return null;
      }

      const showcase = siteConfig.users
        .filter(user => user.pinned)
        .map(user => (
          <a href={user.infoLink} key={user.infoLink}>
            <img src={user.image} alt={user.caption} title={user.caption} loading="lazy" />
          </a>
        ));

      const pageUrl = page => baseUrl + (language ? `${language}/` : '') + page;

      return (
        <div className="productShowcaseSection paddingBottom">
          <h2>Who is Using Terser?</h2>
          <p>Terser is used by these projects</p>
          <div className="logos">{showcase}</div>
          <div className="more-users">
            <a className="button" href={pageUrl('users')}>
              More {siteConfig.title} Users
            </a>
          </div>
        </div>
      );
    };

    const Sponsors = () => {
      if ((siteConfig.sponsors || []).length === 0) {
        return null;
      }

      const showcase = siteConfig.sponsors
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

      const pageUrl = page => baseUrl + (language ? `${language}/` : '') + page;

      return (
        <div className="productShowcaseSection paddingBottom">
          <h2>Patrons</h2>
          <div className="logos">{showcase}</div>
          <div className="more-users">
            <a className="button" disabled href={pageUrl('sponsors')}>
              More {siteConfig.title} Sponsors
            </a>
          </div>
        </div>
      );
    };

    const OCSponsors = () => {
      return (
        <div style={{maxWidth: 890, padding: '2ch', margin: 'auto'}} className="productShowcaseSection paddingBottom">
          <h2>Code Contributors</h2>

          <p>This project exists thanks to all the people who contribute. [<a href="CONTRIBUTING.md">Contribute</a>].</p>

          <p>
            <a href="https://github.com/terser/terser/graphs/contributors"><img src="https://opencollective.com/terser/contributors.svg?width=890&button=false" /></a>
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
        </div>
      );
    }

    return (
      <div className="darkContainer">
        <HomeSplash siteConfig={siteConfig} language={language} />
        <div className="mainContainer">
          <div className="centeredAd">
            <script async type="text/javascript" src="//cdn.carbonads.com/carbon.js?serve=CWYDK53W&amp;placement=terserorg" id="_carbonads_js"></script>
          </div>
          <Showcase />
          <Sponsors />
          <OCSponsors />
        </div>
      </div>
    );
  }
}

module.exports = Index;
