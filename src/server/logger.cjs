/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

const path = require('path');
const winston = require('winston');
const { format } = require('logform');
const { combine, timestamp, label, json } = format;

/**
 * Retrieve the directory name and filename of the calling module.
 *
 * @param {Object} callingModule - The module invoking the logger.
 * @returns {string} - Directory and filename.
 */
const getLabel = function(callingModule) {
  // const parts = callingModule.filename.split(path.sep);
  // return path.join(parts[parts.length - 2], parts.pop());
  return callingModule;
};

module.exports = function(callingModule) {
  const logger = winston.createLogger({
    level: 'info',
    transports: [
      new winston.transports.Console({
        format: combine(
          timestamp(),
          label({ label: getLabel(callingModule) }),
          json())
      })
    ]
  });
  return logger;
};
