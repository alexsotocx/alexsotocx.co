import MarkdownIt from 'markdown-it';
import HighlightJS from 'highlight.js';

var markdown = new MarkdownIt({
  linkify: true,
  typographer: true,
  highlight(code, language) {
    if (language && HighlightJS.getLanguage(language)) {
      try {
        return HighlightJS.highlight(language, code).value;
      } catch (__) {}
    }

    return '';
  }
});



export default function(md) {
  return markdown.render(md);
}
