(function (global, $) {
	global = global || window;
	$ = $ || jQuery;

	var Greetr = function (firstName, lastName, lang) {
		return new Greetr.init(firstName, lastName, lang);
	};
	
	var supportedLangs = ['en', 'es'];
	
	var greetings = {
		en: 'Hello',
		es: 'Hola'
	};
	
	var formalGreetings = {
		en: 'Greetings',
		es: 'Saludos'
	};
	
	var logMessages = {
		en: 'Logged in',
		es: 'Inicio sesion'
	};
	
	var hasConsoleLog = function (consoleObj) {
		var console = consoleObj || console; 
		return !!(console && typeof console.log === 'function');
	};
	
	Greetr.fn = Greetr.prototype = {
		fullName: function () {
			return this.firstName + ' ' + this.lastName;
		},

		validate: function (lang) {
			lang = lang || this.lang;
			var isValid = supportedLangs.indexOf(this.lang) >= 0;
			
			if (!isValid) {
				throw new Error('Invalid language:' + this.lang);
			}
			
			return isValid;
		},
		
		greeting: function () {
			return greetings[this.lang] + ' ' + this.firstName + '!';
		},
		
		formalGreeting: function () {
			return formalGreetings[this.lang] + ' ' + this.fullName();
		},
		
		greet: function (isFormal) {
			var msg = '';
			
			if (isFormal) {
				msg = this.formalGreeting();
			} else {
				msg = this.greeting();
			}
			
			if (hasConsoleLog(console)) {
				console.log(msg);
			}
			
			return this;
		},
		
		place: function (selector, isFormal) {
			var msg = '';
			
			if (isFormal) {
				msg = this.formalGreeting();
			} else {
				msg = this.greeting();
			}
			
			if (selector) {
				$(selector).html(msg);
			}
			
			return this;
		},
		
		log: function () {
			if (hasConsoleLog(console)) {
				console.log(logMessages[this.lang] + ': ' + this.fullName());
			}
			
			return this;
		},
		
		setLang: function (lang) {
			if (this.validate(lang)) {
				this.lang = lang;
			}
			
			return this;
		}
	};
	
	Greetr.init = function (firstName, lastName, lang) {
		this.firstName = firstName || '';
		this.lastName = lastName || '';
		this.lang = lang || 'en';
		this.validate();
	};
	
	// Trick borrowed from jQuery so we don't have to use the `new` keyword.
	Greetr.init.prototype = Greetr.fn;
	
	Greetr.languages = (function (langs) {
		var langObj = {};
		
		langs.forEach(function (lang) {
			langObj[lang.toUpperCase()] = lang;
		});
		
		return langObj;
	}(supportedLangs));
	
	if (global && !global.G$) {
		// Attach our Greetr to the global object and provide a shorthand `G$`.
		global.Greetr = global.G$ = Greetr;
	}
	
	return Greetr;
}(window, $));
