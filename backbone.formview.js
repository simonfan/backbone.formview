define(['backbone.modelview','underscore'], function(ModelView, undef) {
	var FormView = ModelView.extend({

		initialize: function(options) {
			// call the ModelView initialize
			ModelView.prototype.initialize.call(this, options);

			_.bindAll(this,'_update','mapFormElement');

			var _this = this;

			/**
			 * Save the 'map name' on the jquery DOM element.
			 * so that we can retrieve it later when updating the model (through this._update)
			 */
			_.each(this.map, this.mapFormElement);
		},


		/**
		 * Associates the form element with the model attribute.
		 */
		mapFormElement: function(selector, attrName) {

		//	console.log('selector: ' + selector);
		//	console.log('attrName: ' + attrName);

			// set on map object
			this.map[ attrName ] = selector;

			this.$el
				.find(selector)
				// get only form fields
				.filter('input,select,textarea')
				// save the name parameter on the dom element.
				.data('Backbone.FormView-name', attrName)
				.change(this._update);
		},

		/**
		 * This method is tailor suited to the ModelView implementation
		 * because it depends on the map { modelAttributeName: selector }
		 * hash passed to the initializer function.
		 * 
		 */
		_update: function(e) {
			var $target = $(e.target),
				type = $target.prop('type'),
				name = $target.data('Backbone.FormView-name'),
				value = $target.val();

			if (type === 'checkbox') {
				/**
				 * special care when dealing with checkboxes as they are tricky.
				 */
				value = _.map(this.$el.find(this.map[ name ] + ':checked'), function(check) {
					return $(check).val();
				});
			}

			return this.model.set(name, value);
		},
	});

	return FormView;
});