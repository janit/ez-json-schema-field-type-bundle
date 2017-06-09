YUI.add('jsonschema-jsonschema-editview', function (Y) {
    "use strict";
    Y.namespace('JsonSchema');

    var L = Y.Lang,
        FIELDTYPE_IDENTIFIER = 'jsonschemajsonschema';

    Y.JsonSchema.JSONSchemaEditView = Y.Base.create('jsonschemaEditView', Y.eZ.FieldEditView, [], {
        events: {
            '.jsonschema-jsonschema-input-ui input': {
                'blur': 'validate',
                'valuechange': 'validate'
            }
        },

        validate: function () {
            var validity = this._getInputValidity(),
                config = this._variables();

            if ( validity.valueMissing ) {
                this.set('errorStatus', 'This field is required');
            } else {
                this.set('errorStatus', false);
            }
        },

        _variables: function () {
            var def = this.get('fieldDefinition');

            return {
                "isRequired": def.isRequired
            };
        },

        _getInputValidity: function () {
            return this.get('container').one('.jsonschema-jsonschema-input-ui input').get('validity');
        },

        _getFieldValue: function () {
            return this.get('container').one('.jsonschema-jsonschema-input-ui input').get('value');
        }
    });

    Y.eZ.FieldEditView.registerFieldEditView(
        FIELDTYPE_IDENTIFIER, Y.JsonSchema.JSONSchemaEditView
    );
});
