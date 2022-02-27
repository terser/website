const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');

const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

class HomeSplash extends React.Component {
  render() {
    const { siteConfig, language = '' } = this.props;
    const { baseUrl, docsUrl } = siteConfig;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
    const langPart = `${language ? `${language}/` : ''}`;
    const docUrl = doc => `${baseUrl}${docsPart}${langPart}${doc}`;

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

    const pageUrl = page => baseUrl + (language ? `${language}/` : '') + page;

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

    const Block = props => (
      <Container
        padding={['bottom', 'top']}
        id={props.id}
        background={props.background}
      >
        <GridBlock
          align="center"
          contents={props.children}
          layout={props.layout}
        />
      </Container>
    );

    const TerserOutput = () => (
      <img src="img/terser-output.png" className="terserOutputImg" alt="terser output" width="561" height="123" />
    );

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
            <a className="button" href={pageUrl('users.html')}>
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
          <h2>Sponsors / Patreons</h2>
          <div className="logos">{showcase}</div>
          <div className="more-users">
            <a className="button" disabled href={pageUrl('sponsors.html')}>
              More {siteConfig.title} Sponsors
            </a>
          </div>
        </div>
      );
    };

    return (
      <div className="darkContainer">
        <HomeSplash siteConfig={siteConfig} language={language} />
        <div className="mainContainer">
          <Showcase />
          <Sponsors />
        </div>
      </div>
    );
  }
}

module.exports = Index;
