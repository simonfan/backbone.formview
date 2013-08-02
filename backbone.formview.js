define(['backbone.modelview','underscore'], function(ModelView, undef) {
	var FormView = ModelView.extend({

		initialize: function(options) {
			// call the ModelView initialize
			ModelView.prototype.initialize.call(this, options);

			/**
			 * options.update intercepts the value setting on the model.
			 */
			this.update = options.update;

			_.bindAll(this,'_update');

			var _this = this;

			/**
			 * Save the 'map name' on the jquery DOM element.
			 * so that we can retrieve it later when updating the model (through this._update)
			 */
			_.each(this.map, function(selector, name) {
				// save the name parameter on the dom element.
				_this.$el.find(selector).data('Backbone.FormView-name', name);	
			})
		},

		events: {
			'change input': '_update',
			'change select': '_update',
			'change textarea': '_update',
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