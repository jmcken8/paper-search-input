/**
An element providing a paper-input-like search element inspired by the search element on https://customelements.io

Example:

    <paper-search-input></paper-search-input>

@demo demo/index.html
@hero hero.svg
*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '@polymer/polymer/polymer-legacy.js';

import '@polymer/iron-input/iron-input.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
import '@polymer/iron-flex-layout/iron-flex-layout-classes.js';
import { IronResizableBehavior } from '@polymer/iron-resizable-behavior/iron-resizable-behavior.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
Polymer({
  _template: html`
    <style include="iron-flex iron-flex-alignment">
        :host {
            --search-input-styles-base-color: #fe7701;
            --search-input-styles-base-label-color: #fff;
            --icon-scale-factor-0: 50;
            --search-border-width-0: 1px;
            --search-border-radius-0: 2px;
        }

        button, input, optgroup, select, textarea {
            color: inherit;
            font: inherit;
            margin: 0;
        }

        * {
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
        }

        *:before, *:after {
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
        }

        .search {
            /*@apply(--layout-horizontal);*/
            background: var(--search-background-color, var(--search-input-styles-base-color));
            font-size: 24px;
            margin: var(--search-margin, 0 auto);;
            overflow: hidden;
            width: var(--search-width);
            height: var(--search-height);
            position: relative;
            vertical-align: top;
            z-index: 1;
            border: var(--search-border-width, var(--search-border-width-0)) solid var(--search-text-color, var(--search-input-styles-base-color));
            border-radius: var(--search-border-radius, var(--search-border-radius-0));
        }
        iron-input {
            width: 100%;
            z-index: 10;
        }
        
        .search-field {
            background: transparent;
            border-radius: 0;
            border: none;
            color: var(--search-text-color, var(--search-input-styles-base-color));
            display: block;
            float: right;
            font-weight: 500;
            padding-left: 0.8em;
            padding-top: 0.8em;
            padding-bottom: 0.8em;
            width: 100%;
            z-index: 10;
            height: var(--search-field-height);
        }

        .search-field:focus {
            outline: none;
        }

        .search-label {
            color: var(--search-label-color, var(--search-input-styles-base-label-color));
            font-size: 70.25%;
            font-weight: bold;
            padding: 0 1em;
            pointer-events: none;
            position: absolute;
            left: 0;
            text-align: left;
            width: 100%;
            height: 100%;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            -khtml-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            @apply --layout-center-justified;
        }

        .search-label svg {
            /*top: 20px;*/
            @apply --layout-self-center;
            position: absolute;
            left: 20px;
            width: 30px;
            height: 30px;
            -webkit-transition: -webkit-transform 0.3s;
            transition: transform 0.5s;
        }

        .search-label svg path { transition: fill 0.5s; }

        .search-label svg path {
            fill: var(--search-label-color, var(--search-input-styles-base-label-color));
        }

        .search-label-content {
            display: block;
            padding-left: 2.5em;
            /*apadding: 1.5em 0 0 2.75em;*/
            position: relative;
            width: 100%;
            -webkit-transition: -webkit-transform 0.5s;
            transition: transform 0.5s;
            @apply --layout-self-center;
        }

        .search-field:focus + .search-label svg, .search-filled svg {
            -webkit-transform: scale(var(--icon-scale-factor-0));
            transform: scale(var(--icon-scale-factor-0));
        }

        .search-field:focus + .search-label .search-label-content, .search-filled .search-label .search-label-content {
            color: var(--search-label-color-alt, var(--search-input-styles-base-label-color));
        }

        .search-field:focus + .search-label svg path, .search-filled svg path {
            fill: var(--search-label-color-alt, var(--search-input-styles-base-label-color));
        }

        .clear-button {
            @apply --layout-self-center;
            margin-right: 10px;
            right: 0;
            position: relative;
            color: var(--search-text-color, var(--search-input-styles-base-color));
        }
    </style>

    <div id="search" class\$="search {{_searchClass(value, _focused)}} layout horizontal" on-resized="searchResized">
        <iron-input bind-value="{{value}}">
            <input name="q" class="search-field" type="text" id="search-field" autocomplete="off" value="{{value::input}}" on-keyup="_onKeyPress" on-focus="_onFocus" on-blur="_onBlur">
          </iron-input>
        <label class="search-label layout horizontal" for="search-field">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="612px" height="612px" viewBox="0 0 612 612" xml:space="preserve">
                <path d="M5.817,606.299c7.729,7.614,20.277,7.614,28.007,0L192.448,450.2c44.267,35.333,100.622,56.586,162.067,56.586c142.211,0,257.487-113.439,257.487-253.393C612.003,113.439,496.727,0,354.516,0S97.028,113.439,97.009,253.393c0,65.424,25.424,124.879,66.802,169.834L5.8,578.714C-1.929,586.328-1.929,598.686,5.817,606.299z"></path>
            </svg>
            <span hidden\$="[[_focused]]" class="search-label-content label">
                    ​<slot class="label">{{_getLabel(_focused, value, label)}}</slot>
            </span>
        </label>
        <paper-icon-button class="clear-button" icon="backspace" on-tap="clear"></paper-icon-button>
    </div>
`,

  is: 'paper-search-input',

  behaviors: [
    IronResizableBehavior
  ],

  properties: {
    /**
     * `value` is the search box value
     */
    value: {
      type: String,
      value: '',
      notify: true,
      observer: '_valueChanged'
    },
    
    /**
     * `label` is the label in the search box
     * @Default: 'Search...'
     */
    label: {
      type: String,
      value: 'Search...',
      notify: true
    },
    
    executeOnEmpty: {
      type: Boolean,
      value: false,
      notify: true
    },
    
    _focused: {
      type: Boolean,
      value: false,
      notify: true
    },
    scale: {
      type: String,
      value: '50',
      notify: true,
      observer: 'scaleChanged'
    },
    /**
     * Describes the author of the element, but is really just an excuse to
     * show off JSDoc annotations.
     *
     * @type {{name: string, image: string}}
     */
    author: {
      type: Object,
      // Use `value` to provide a default value for a property, by setting it
      // on your element's prototype.
      //
      // If you provide a function, as we do here, Polymer will call that
      // _per element instance_.
      //
      // We do that to ensure that each element gets its own copy of the
      // value, rather than having it shared across all instances (via the
      // prototype).
      value: function() {
        return {
          name:  'Keith Andrew Hill (aka: vic10us)',
          image: 'http://addyosmani.com/blog/wp-content/uploads/2013/04/unicorn.jpg',
        };
      },
      isReady: {
          type: Boolean,
          value: false
      }
    },
    version: {
      type: String,
      value: 'v1.0.7',
      readonly: true
    }
  },

  // Element Lifecycle

  listeners: {
    'iron-resize': '_onIronResize'
  },

  ready: function() {
      this.isReady = true;
      this.notifyResize();
    // `ready` is called after all elements have been configured, but
    // propagates bottom-up. This element's children are ready, but parents
    // are not.
    //
    // This is the point where you should make modifications to the DOM (when
    // necessary), or kick off any processes the element wants to perform.
  },

  attached: function () {
      /*this.isReady = true;
      this.notifyResize();
      this.async(function() { console.log(this, this.offsetWidth, this.$.search.offsetWidth); }, 250);*/
    // `attached` fires once the element and its parents have been inserted
    // into a document.
    //
    // This is a good place to perform any work related to your element's
    // visual state or active behavior (measuring sizes, beginning animations,
    // loading resources, etc).
  },

  detached: function() {
    // The analog to `attached`, `detached` fires when the element has been
    // removed from a document.
    //
    // Use this to clean up anything you did in `attached`.
  },

  // Element Behavior

  /**
   * Clear the search box and blur input
   */
  clear: function() {
      this.value = '';
      this.blur();
      this.dispatchEvent(new CustomEvent('value-cleared', { bubbles: true, composed: true }));
  },

  scaleChanged: function() {
      if (this.isReady) {
        this.updateStyles({'--icon-scale-factor-0': this.scale});
      }
  },

  /**
   * Blur the input
   */
  blur: function() {
    this.$['search-field'].blur();
  },

  /**
   * Default search action bound to the Enter keu
   *
   * @param {e} event source
   */
  _onKeyPress: function (e) {
      if (e.keyCode === 27) {
          this.$['search-field'].blur();
      }
      if (e.keyCode === 13) { // Enter
          this.executeSearch();
      }
  },

  /**
   * search input focus event
   */
  _onFocus: function(e) {
      this._focused = true;
  },

  /**
   * search input blur event
   */
  _onBlur: function(e) {
      this._focused = false;
  },

  /**
   * label compute method
   */
  _getLabel: function(focus, val, label) {
      return (focus || val !== '') ? '' : this.label;
  },

  /**
   * search class compute method
   */
  _searchClass: function(v, f) {
    return (f || v !== '') ? 'search-filled' : '';
  },

  _valueChanged: function(n, o) {
      this.dispatchEvent(new CustomEvent('value-changed', { bubbles: true, composed: true, detail: { oldValue: o, newValue: n } }));
  },

  get parent() {
    if (this.parentNode.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
        return this.parentNode.host;
    }
    return this.parentNode;
  },

  _onIronResize: function () {
      if (this.isReady) {
          var newScale = '' + (Math.floor(this.$.search.offsetWidth / 15) + 5);
          if (this.scale !== newScale) {
              this.scale = newScale;
          }
      }
  },

  /**
   * The `paper-search-input-execute` event is fired whenever `executeSearch` is called.
   *
   * @event paper-search-input-execute
   * @detail {{value: String}}
   */

  /**
   * The `value-changed` event is fired whenever the value is changed.
   *
   * @event value-changed
   * @detail {{newValue: String, oldValue: String}}
   */

  /**
   * The `value-cleared` event is fired whenever clear() is called.
   *
   * @event value-cleared
   * @detail {{ }}
   */

  /**
   * The enter key was pressed to execute the search
   */
  executeSearch: function() {
    if (this.value.trim() !== '' || this.executeOnEmpty) {
      this.dispatchEvent(new CustomEvent('paper-search-input-execute', { bubbles: true, composed: true, detail: { value: this.value } }));
    }
  }
});
