Template.editable_checkbox_widget.helpers({    
  checked : function() {
    return this.context.itemWebhookEnable !== undefined && this.context.itemWebhookEnable === 1 ? 'checked' : '';  
  },
 initOptions : function() {
    var data = this;
  var derivedOptions = (data.derivedOptions) ? EditableText._callback.call(data,'derivedOptions',data) : {};
  var opts = _.extend(data.options || {}, _.isObject(derivedOptions) && derivedOptions || {});
    if (opts) {
      _.each(opts, function (value, key) {
        if (data[key] === undefined) {
          data[key] = value;
        }
      });
    var context = opts.context || opts.doc || opts.document || opts.obj || opts.object || opts.data || opts.dataContext;
      if (context !== undefined) {
        data.context = context;
      }
    } 
  }  
});

Template.editableCheckbox.helpers({
  context : function() {
    return this.context || this.document || this.doc || this.object || this.obj || this.data || this.dataContext || Blaze._parentData(1);
  }
});


Template.editable_checkbox_widget.events({
  'click input[type=checkbox]': function(evt) {
      var updatedValue = {};
      updatedValue[this.field] = $(evt.target).is(":checked") ? 1 : 0;
      var modifier = {$set: updatedValue};

      Meteor.call('_editableCheckbox',this, modifier, 
        function(err,res) {
          if (err) {
            console.log(err);
          }
      });
      return;
  }
});
