/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

const path = require('path');
const winston = require('winston');
const { format } = require('logform');
const { combine, timestamp, label, json } = format;

// Return the last folder name in the path and the calling
// module's filename.
const getLabel = function(callingModule) {
  const parts = callingModule.filename.split(path.sep);
  return path.join(parts[parts.length - 2], parts.pop());
};

// const { format } = require('logform');
// const { combine, timestamp, label, json } = format;

// const logger = winston.createLogger({
//   transports: [
//     new winston.transports.File({
//       filename: 'combined.log',
//       format: combine(
//         timestamp(),
//         json())
//     }),
//     new winston.transports.Console({
//       format: combine(
//         timestamp(),
//         json())
//     })
//   ]
// });

// if (process.env.NODE_ENV !== 'production') {
//   logger.add(new winston.transports.Console({
//       format: winston.format.simple()
//   }));
// }

module.exports = function (callingModule) {
  return new winston.createLogger({
    transports: [
            // new winston.transports.File({
            //   filename: 'combined.log',
            //   format: combine(
            //     timestamp(),
            //     label({ label: getLabel(callingModule) }),
            //     json())
            // }),
            new winston.transports.Console({
              format: combine(
                timestamp(),
                label({ label: getLabel(callingModule) }),
                json())
            })
          ]
  });



};