YUI.add('jsonschema-jsonschema-view', function (Y) {
    "use strict";
    Y.namespace('JsonSchema');

    Y.JsonSchema.JSONSchemaView = Y.Base.create('jsonschemaView', Y.eZ.FieldView, [], {
        _isFieldEmpty: function () {
            return (this.get('field').fieldValue === null);
        },

        _getName: function () {
            return Y.JsonSchema.JSONSchemaView.NAME;
        },
    });

    Y.eZ.FieldView.registerFieldView('jsonschemajsonschema', Y.JsonSchema.JSONSchemaView);
});
