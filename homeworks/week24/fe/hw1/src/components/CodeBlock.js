import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
// 設置高亮樣式
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism';


class CodeBlock extends PureComponent {
  static propTypes = {
    value: PropTypes.string.isRequired,
    language: PropTypes.string,
  };

  static defaultProps = {
    language: null,
  };

  render() {
    const { language, value } = this.props;
    return (
      <figure className="highlight">
        <SyntaxHighlighter language={language} style={prism}>
          {value}
        </SyntaxHighlighter>
      </figure>
    );
  }
}


export default CodeBlock;
