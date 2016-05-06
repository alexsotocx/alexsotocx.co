import MarkdownIt from 'markdown-it';
import HighlightJS from 'highlight.js';

var markdown = new MarkdownIt({
  linkify: true,
  typographer: true,
  langPrefix: '',
  highlight(code, language) {
    if (language && HighlightJS.getLanguage(language)) {
      try {
        return HighlightJS.highlight(language, code).value;
      } catch (error) {}
    }
    return '';
  }
});


export default function(md) {
  return markdown.render(md);
}
