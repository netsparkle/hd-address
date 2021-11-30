'use strict';

let MnemonicHD = require("./lib/utils/mnemonic.hd")
let SeedHD = require("./lib/utils/seed.hd")
let Base58HD = require("./lib/utils/base58.hd")

let HdWallet = require("./lib/base/hd.wallet.class")
let AddressClass = require("./lib/base/address.class")

let Address = {
    JNGA: require("./lib/jnga.address")
}

module.exports = {
    keyType: {
        "mnemonic": "mnemonic",
        "seed": "seed",
        "base58": "base58",
        "root": "root"
    },
    AddressClass,
    HdWallet,
    HD: (key, keyType = "mnemonic", pwd) => {
        let hd
        if (keyType == "mnemonic") {
            hd = new MnemonicHD(key, pwd)
        } else if (keyType == "seed") {
            hd = new SeedHD(key)
        } else if (keyType == "base58") {
            hd = new Base58HD(key)
        } else if (keyType == "root") {
            hd = new HdWallet(key)
        } else {
            throw "key type unsupported"
        }
        return {
            wallet: hd,
            JNGA: new Address.JNGA(hd, "JNGA"),
        }
    },
    mnemonic: MnemonicHD,
    seed: SeedHD,
    base58: Base58HD
}
