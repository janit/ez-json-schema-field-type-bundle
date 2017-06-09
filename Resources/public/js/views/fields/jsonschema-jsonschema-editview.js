YUI.add('jsonschema-jsonschema-editview', function (Y) {
    "use strict";
    Y.namespace('JsonSchema');

    var L = Y.Lang,
        FIELDTYPE_IDENTIFIER = 'jsonschemajsonschema',
        EVENT_LAYOUT_EDITOR_CHANGE = 'change';

    Y.JsonSchema.JSONSchemaEditView = Y.Base.create('jsonschemaEditView', Y.eZ.FieldEditView, [], {
        events: {
            '.jsonschema-jsonschema-input-ui input': {
                'blur': 'validate',
                'valuechange': 'validate'
            }
        },

        initializer: function () {
            this.after('activeChange', this._bootEditor, this);
        },

        _bootEditor: function(){
            var textarea = this._getTextareaNode(),
                textareaValue = textarea.get('value').trim(),
                starting_value = '{}',
                jsonEditorContainer,
                jsonEditor;

            if (textareaValue !== '') {
                starting_value = JSON.parse(textareaValue);
            }

            jsonEditorContainer = this._getEditorContainerNode()._node;


            jsonEditor = new JSONEditor(jsonEditorContainer,{
                "ajax": true,
                "startval": starting_value,
                "schema": {
                    "$ref": "/bundles/ezjsonschemafieldtype/schema/test.json"
                }
            });

            // Listen for changes
            jsonEditor.on(EVENT_LAYOUT_EDITOR_CHANGE, function () {
                textarea.set('value', JSON.stringify(jsonEditor.getValue()));
            });

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
            return this._getTextareaNode().get('validity');
        },

        _getFieldValue: function () {
            return this._getTextareaNode().get('value');
        },

        _getTextareaNode: function () {
            return this.get('container').one('.ez-textblock-input-ui textarea.jsoneditor-data');
        },

        _getEditorContainerNode: function () {
            return this.get('container').one('.ez-textblock-input-ui .jsoneditor-container');
        },

    });

    Y.eZ.FieldEditView.registerFieldEditView(
        FIELDTYPE_IDENTIFIER, Y.JsonSchema.JSONSchemaEditView
    );
});
