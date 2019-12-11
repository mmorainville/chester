'use strict';

const fs = require('fs');
const path = require('path');
const captureWebsite = require('capture-website');

/**
 * Lifecycle callbacks for the `Link` model.
 */

module.exports = {
  // Before saving a value.
  // Fired before an `insert` or `update` query.
  // beforeSave: async (model, attrs, options) => {},

  // After saving a value.
  // Fired after an `insert` or `update` query.
  // afterSave: async (model, response, options) => {},

  // Before fetching a value.
  // Fired before a `fetch` operation.
  // beforeFetch: async (model, columns, options) => {},

  // After fetching a value.
  // Fired after a `fetch` operation.
  // afterFetch: async (model, response, options) => {},

  // Before fetching all values.
  // Fired before a `fetchAll` operation.
  // beforeFetchAll: async (model, columns, options) => {},

  // After fetching all values.
  // Fired after a `fetchAll` operation.
  // afterFetchAll: async (model, response, options) => {},

  // Before creating a value.
  // Fired before an `insert` query.
  beforeCreate: async (model, attrs, options) => {
    const attributes = model.attributes ? model.attributes : model;
    if (attributes.url) {
      try {
        let buffer = await captureWebsite.base64(
          attributes.url,
          {
            width: 1600,
            height: 1200,
            scaleFactor: 0.25,

            launchOptions: {
              args: [
                '--no-sandbox',
                '--disable-setuid-sandbox'
              ]
            }
          });

        let base64 = buffer.toString('base64');
        attributes.screenshot = `data:image/png;base64,${base64}`;
      } catch (e) {
        console.log(e);
      }
    }
  },

  // After creating a value.
  // Fired after an `insert` query.
  // afterCreate: async (model, attrs, options) => {},

  // Before updating a value.
  // Fired before an `update` query.
  // beforeUpdate: async (model, attrs, options) => {},

  // After updating a value.
  // Fired after an `update` query.
  // afterUpdate: async (model, attrs, options) => {},

  // Before destroying a value.
  // Fired before a `delete` query.
  // beforeDestroy: async (model, attrs, options) => {},

  // After destroying a value.
  // Fired after a `delete` query.
  // afterDestroy: async (model, attrs, options) => {}
};
