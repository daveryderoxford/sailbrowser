//#region Object Getter/Setter (reflection)

export class PropertyUtilities {
    static getDefined( value: any, def: any): any {
        if ( _.isUndefined(value) ) {
            return( def );
        } else {
            return(  value );
        }
    }


    /**
     * Used to get a value from an object with the given property name.
     *
     * @param object The object to obtain the value from.
     * @param propertyString A dotted notation string of properties to use to obtain the value.
     * @returns The value specified by the property string from the given object.
     */
    static getValue(object: any, propertyString: string): any {
        var properties: string[],
            property: string,
            i: number;

        if (!object) {
            return null;
        }

        if (!propertyString) {
            return null;
        }

        // This handles the simplest case (a property string without a dotted notation)
        // as well as an edge case (a property whose name contains dots).
        if (object[propertyString]) {
            return object[propertyString];
        }

        // Break the property string down into individual properties.
        properties = propertyString.split('.');

        // Dig down into the object hierarchy using the properties.
        for (i = 0; i < properties.length; i += 1) {
            // Grab the property for this index.
            property = properties[i];

            // Grab the object with this property name.
            object = object[property];

            // If we've hit a null, then we can bail out early.
            if (object === null) {
                return null;
            }
        }

        // Finally, return the object that we've obtained.
        return object;
    }

    /**
     * Sets the value of a property with the specified propertyString on the supplied model object.
     * Objects in the hierarchy that do not exist will be populated with new objects.
     *
     * @param object The object on which to set the value.
     * @param propertyString A dotted notation string of properties to use to set the value.
     * @param value The value to set.
     */
    static setValue(object: any, propertyString: string, value: any): void;

    /**
     * Sets the value of a property with the specified propertyString on the supplied model object.
     *
     * @param object The object on which to set the value.
     * @param propertyString A dotted notation string of properties to use to set the value.
     * @param value The value to set.
     * @param instantiateObjects True to create objects in the hierarchy that do not yet exist; defaults to true.
     */
    static setValue(object: any, propertyString: string, value: any, instantiateObjects: boolean): void;

    /**
     * Sets the value of a property with the specified propertyString on the supplied model object.
     *
     * @param object The object on which to set the value.
     * @param propertyString A dotted notation string of properties to use to set the value.
     * @param value The value to set.
     * @param instantiateObjects True to create objects in the hierarchy that do not yet exist; defaults to true.
     */
    static setValue(object: any, propertyString: string, value: any, instantiateObjects?: boolean): void {
        var properties: string[],
            property: string,
            i: number;

        if (!object) {
            return;
        }

        if (!propertyString) {
            return;
        }

        // Default the flag to true if it is not specified.
        if (typeof (instantiateObjects) === 'undefined') {
            instantiateObjects = true;
        }

        // Break the property string down into individual properties.
        properties = propertyString.split('.');

        // Dig down into the object hierarchy using the properties.
        for (i = 0; i < properties.length; i += 1) {
            // Grab the property for this index.
            property = properties[i];

            if (properties.length - 1 === i) {
                // If this is the last property, then set the value.
                object[property] = value;
            }
            else {
                // If this is not the last property, then we need to traverse.

                // Grab the object with this property name.
                if (object[property]) {
                    // We encountered a non-null object! Grab it and traverse.
                    object = object[property];
                }
                else if (instantiateObjects) {
                    // If we've hit a null, and the flag is true create a new
                    // empty object and continue traversal.
                    object[property] = {};
                    object = object[property];
                }
                else {
                    // If we've hit a null, and the flag is false, then bail out.
                    return;
                }
            }
        }
    }

    //#endregion

    //#region Function getters (reflection)

    /**
     * Used to obtain a function from the window scope using the dotted notation property string.
     *
     * @param propertyString The dotted notation property string used to obtain the function reference from the scope.
     */
    static getFunction(propertyString: string): () => any;

    /**
     * Used to obtain a function from the given scope using the dotted notation property string.
     *
     * @param scope The scope to being the search at.
     * @param propertyString The dotted notation property string used to obtain the function reference from the scope.
     */
    static getFunction(scope: any, propertyString: string): () => any;

    /**
     * Used to obtain a function from the given scope using the dotted notation property string.
     *
     * If inferContext is true, then the method will attempt to determine which context the function should be executed in.
     * For example, given the string 'something.else.theFunction' where 'theFunction' is a function reference, the context
     * would be 'something.else'. In this case the function returned will be wrapped in a function that will invoke the original
     * function in the correct context. This is most useful for client event strings as passed from the server.
     *
     * @param scopeOrPropertyString The scope to being the search at OR a property string (which assumes the scope is window).
     * @param propertyString The dotted notation property string used to obtain the function reference from the scope.
     */
    static getFunction(scopeOrPropertyString?: any, propertyString?: string): () => any;

    /**
     * Used to obtain a function from the given scope using the dotted notation property string.
     *
     * If inferContext is true, then the method will attempt to determine which context the function should be executed in.
     * For example, given the string 'something.else.theFunction' where 'theFunction' is a function reference, the context
     * would be 'something.else'. In this case the function returned will be wrapped in a function that will invoke the original
     * function in the correct context. This is most useful for client event strings as passed from the server.
     *
     * @param scopeOrPropertyString The scope to being the search at OR a property string (which assumes the scope is window).
     * @param propertyString The dotted notation property string used to obtain the function reference from the scope.
     * @param inferContext Indicates that we should attempt determine the context in which the function should be called.
     */
    static getFunction(scopeOrPropertyString?: any, propertyString?: string, inferContext?: boolean): () => any;

    /**
     * Used to obtain a function from the given scope using the dotted notation property string.
     *
     * If inferContext is true, then the method will attempt to determine which context the function should be executed in.
     * For example, given the string 'something.else.theFunction' where 'theFunction' is a function reference, the context
     * would be 'something.else'. In this case the function returned will be wrapped in a function that will invoke the original
     * function in the correct context. This is most useful for client event strings as passed from the server. Defaults to true.
     *
     * @param scopeOrPropertyString The scope to being the search at OR a property string (which assumes the scope is window).
     * @param propertyString The dotted notation property string used to obtain the function reference from the scope.
     * @param inferContext Indicates that we should attempt determine the context in which the function should be called.
     */
    static getFunction(scopeOrPropertyString?: any, propertyString?: string, inferContext?: boolean): () => any {
        var scope: any,
            fn: () => any,
            contextPropertyString: string,
            context: any;

        // Default the inferContext variable to true.
        if (inferContext === null) {
            inferContext = true;
        }

        if (typeof (scopeOrPropertyString) === 'string') {
            // If the first parameter was a string, then we know they used the string only overload.
            // In that case default the scope to be the window object.
            scope = window;
            propertyString = scopeOrPropertyString;
        }
        else {
            // Otherwise, treat the first parameter as the scope object.
            scope = scopeOrPropertyString;
        }

        // Delegate to the getValue() function to do the work.
        fn = this.getValue(scope, propertyString);

        if (!fn) {
            return null;
        }

        if (inferContext) {
            // Now that we've obtained a function reference, lets see if we can find the context to use
            // to invoke the function in.
            if (propertyString.indexOf('.') > -1) {
                // Use the property string all the way up to the last segment.
                // For example, if property string was: something.else.theFunction
                // then the context string would be: something.else
                contextPropertyString = propertyString.substr(0, propertyString.lastIndexOf('.'));

                // Now delegate to the getValue() function to do the work.
                context = this.getValue(scope, contextPropertyString);
            }
            else {
                // If the property string is not a dotted notation string, then use
                // the scope itself as the context object.
                context = scope;
            }

            // Now that we have a context object, we'll use this underscore helper to wrap the original
            // function in a function that will call said function with the given context.
            fn = _.bind(fn, context);
        }

        // Return the newly created wrapper function.
        return fn;
    }
}
        //#endregion
