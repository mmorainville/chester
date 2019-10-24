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
  // beforeCreate: async (model, attrs, options) => {},

  // After creating a value.
  // Fired after an `insert` query.
  afterCreate: async (model, attrs, options) => {
    let hostname = null;
    try {
      hostname = new URL(model.attributes.url).hostname;
    } catch (e) {
      console.log(e);
    }

    if (hostname) {
      let uploadsFolder = path.join(strapi.config.public.path, '/uploads/links');
      if (!fs.existsSync(uploadsFolder)) {
        fs.mkdirSync(uploadsFolder);
      }

      try {
        await captureWebsite.file(
          model.attributes.url,
          path.join(strapi.config.public.path, `/uploads/links/${model.attributes.id}.${hostname}.png`),
          {
            width: 1600,
            height: 1200,
            scaleFactor: 1,
            overwrite: true
          });
      } catch (e) {
        console.log(e);
      }
    }
  },

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
