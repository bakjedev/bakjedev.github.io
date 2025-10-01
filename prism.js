/* Minimal Prism.js implementation for syntax highlighting */
var Prism = (function() {
	var lang = {
		'comment': /\/\/.*|\/\*[\s\S]*?\*\//,
		'string': /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
		'keyword': /\b(?:alignas|alignof|asm|auto|bool|break|case|catch|char|char8_t|char16_t|char32_t|class|const|consteval|constexpr|constinit|const_cast|continue|decltype|default|delete|do|double|dynamic_cast|else|enum|explicit|export|extern|false|float|for|friend|goto|if|inline|int|long|mutable|namespace|new|noexcept|nullptr|operator|private|protected|public|register|reinterpret_cast|return|short|signed|sizeof|static|static_assert|static_cast|struct|switch|template|this|thread_local|throw|true|try|typedef|typeid|typename|union|unsigned|using|virtual|void|volatile|wchar_t|while)\b/,
		'builtin': /\b(?:std|cout|cin|endl|cerr|clog|string|vector|map|set|pair|array|list|deque|stack|queue|priority_queue|unordered_map|unordered_set|shared_ptr|unique_ptr|weak_ptr|make_shared|make_unique|move|forward|swap|begin|end|size|empty|push_back|pop_back|push_front|pop_front|insert|erase|clear|find|sort|reverse|fill|copy|transform|accumulate|count|max|min|abs|sqrt|pow|ceil|floor|round)\b/,
		'number': /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
		'operator': /->|<<|>>|[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/%~^&|]/,
		'punctuation': /[{}[\];(),.]/,
		'namespace': /::/
	};

	function tokenize(text, grammar) {
		var tokens = [];
		var rest = text;

		while (rest) {
			var matched = false;
			var bestMatch = null;
			var bestType = null;
			var bestLength = 0;

			// Find the earliest match among all patterns
			for (var type in grammar) {
				var pattern = grammar[type];
				var match = pattern.exec(rest);

				if (match && match.index === 0 && match[0].length > bestLength) {
					bestMatch = match;
					bestType = type;
					bestLength = match[0].length;
					matched = true;
				}
			}

			if (matched && bestMatch) {
				tokens.push({
					type: bestType,
					content: bestMatch[0]
				});
				rest = rest.slice(bestMatch[0].length);
			} else {
				// No match found, consume one character
				tokens.push({
					type: 'text',
					content: rest[0]
				});
				rest = rest.slice(1);
			}
		}

		return tokens;
	}

	function highlightElement(element) {
		var code = element.textContent;
		var language = element.className.match(/language-(\w+)/);
		
		if (!language) {
			return;
		}

		var grammar = lang;
		var tokens = tokenize(code, grammar);
		var html = '';

		for (var i = 0; i < tokens.length; i++) {
			var token = tokens[i];
			if (token.type === 'text') {
				html += token.content;
			} else {
				html += '<span class="token ' + token.type + '">' + token.content + '</span>';
			}
		}

		element.innerHTML = html;
	}

	return {
		highlightAll: function() {
			var elements = document.querySelectorAll('pre code[class*="language-"]');
			for (var i = 0; i < elements.length; i++) {
				highlightElement(elements[i]);
			}
		},
		highlightElement: highlightElement
	};
})();
