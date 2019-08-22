const React = require('react');

const iframeStyle = {
  margin: 0,
  padding: 0,
  border: 'none',
  width: '100%',
  height: '100%',
}

class Repl extends React.Component {
  render() {
    return (
      <iframe src='https://try.terser.org' style={iframeStyle} />
    );
  }
}

module.exports = Repl;
