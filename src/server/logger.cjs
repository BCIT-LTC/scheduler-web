/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

const path = require('path');
const winston = require('winston');
const { format } = require('logform');
const { combine, timestamp, label, json } = format;

const logger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.Console({
      format: combine(
        timestamp(),
        label({ label: __filename }),
        json())
    })
  ]
});

module.exports = logger;