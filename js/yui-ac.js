YUI().use('autocomplete', 'autocomplete-filters', 'autocomplete-highlighters', function (Y) {
  Y.one('#ac-input').plug(Y.Plugin.AutoComplete, {
    resultFilters    : 'phraseMatch',
    resultHighlighter: 'phraseMatch',
    source           : autoCompleteWords 
  });
});