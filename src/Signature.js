const Crypto = require("crypto-js");

var Signature = {
    getSignature: function(config, date, policyBase64) {
        function getSignatureKey(key, dateStamp, regionName) {
            const kDate = Crypto.HmacSHA256(dateStamp, "AWS4" + key);
            const kRegion = Crypto.HmacSHA256(regionName, kDate);
            const kService = Crypto.HmacSHA256("s3", kRegion);
            const kSigning = Crypto.HmacSHA256("aws4_request", kService);
            return kSigning;
        };
        function signature(policyEncoded) {
            return Crypto.HmacSHA256(policyEncoded, getSignatureKey(config.secretAccessKey, date, config.region)).toString(Crypto.enc.Hex);
        };
        return signature(policyBase64);
    }
}

export default Signature;
