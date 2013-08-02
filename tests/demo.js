define(['../backbone.formview','backbone'], function(FormView, Backbone) {
	window.model = new Backbone.Model();

	window.form = new FormView({
		el: $('.form'),
		model: model,
		/**
		 * maps the data values to the html selectors
		 */
		map: {
		//	'title': '.title',
		//	'thumbnail': 'img',
			'fruit': '.option',
			'input': '.input-text',
			'choice': 'input[name="choose-one"]',
			'check': 'input[name="choose-multiple"]',
		},
		/** 
		 * method called to get the data hash to be displayed.
		 */
		data: function(model) {
			return model.attributes;
		},
	});



	model.set({
		title: 'Testing title',
		thumbnail: 'warning.gif',
		fruit: 'banana',
		input: 'LALALALALALA',
		choice: 'three',
		check: ['first','third','sixth']
	});

	model.on('change', function(model) {
		console.log(model.attributes);
	})
});