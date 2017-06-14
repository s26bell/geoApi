'use strict';
const root = require('./root.js')();
const shared = require('./shared.js')();
const rcolour = require('rcolor');

class PlaceholderFC extends root.Root {
    // contains dummy stuff to stop placeholder states from freaking out
    // prior to a layer being loaded.

    /**
     * Create a placeholder FC to provide enough information for the UI to display
     * content while we wait for the layer to load.
     *
     * @param {Object} parent    the Record object the placeholder belongs to
     * @param {String} name      visible name for placeholder (shown in app)
     */
    constructor (parent, name) {
        super();
        this._parent = parent;
        this.name = name;
        this._layerType = shared.clientLayerType.UNKNOWN;

        const c = rcolour({ saturation: 0.4, value: 0.8 });
        this.symbology = [parent._apiRef.symbology.generatePlaceholderSymbology(name || '?', c)];
    }

    /**
     * Indicates visibility of the FC.
     *
     * @function getVisibility
     * @returns {Boolean}         the visibility of the FC
     */
    getVisibility () {
        // TODO enhance to have some default value, assigned in constructor?
        // TODO can a user toggle placeholders? does state need to be updated?
        return true;
    }

    // TODO do we need to check if parent exists? Placeholder use-cases are not flushed out right now.
    get state () { return this._parent._state; }

    get layerType () {return this._layerType; }
    set layerType (value) { this._layerType = value; }

}

module.exports = () => ({
    PlaceholderFC
});
