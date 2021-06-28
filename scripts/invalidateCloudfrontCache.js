/**
 * This script invalidates index.html (important) and other static files.
 *
 * create-react-app changes the names of the static file output on each build.
 *
 * The only things that don't change are like icons, index.html,
 * asset-manifest.json, manifest.json, robots.txt and anything
 * else that is static.
 *
 * We can use this script to invalidate those when needed. All other
 * CSS and JS can be left alone.
 */

// Create new cloudfront instance
const AWS = require('aws-sdk');
const cloudfront = new AWS.CloudFront();

// Remember to include leading forward slashes on all items
const Items = [
  '/index.html',
];

// In case we want to invalidate the same items across many cloudfront distributions
const distributionIds = [
    'E304TYGPETGWCU',
];

distributionIds.forEach((DistributionId) => {
  // Specify items and distribution ID to invalidate
  const params = {
    DistributionId,
    InvalidationBatch: {
      CallerReference: new Date().toISOString(),
      Paths: {
        Quantity: Items.length,
        Items,
      },
    },
  };

  // Execute invalidation
  cloudfront.createInvalidation(params, (err, data) => {
    if (err)
      console.error(`Error invalidating ${DistributionId}`, err, err.stack);
    else console.log('CDN invalidation successful: ', data);
  });
});
