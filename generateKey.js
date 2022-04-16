/* eslint-disable node/no-missing-require */
const {generateKeyPair} = require('jose/util/generate_key_pair');
const {fromKeyLike} = require('jose/jwk/from_key_like');

generateKeyPair('ES256').then(val => {
  fromKeyLike(val.privateKey).then(data =>
    console.log(JSON.stringify(data), 'privateKey')
  );
  fromKeyLike(val.publicKey).then(data =>
    console.log(JSON.stringify(data), 'publicKey')
  );
});
