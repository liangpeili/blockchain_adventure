#!/usr/bin/env python
#coding:utf-8

import json
import requests

address = '13AM4VW2dhxYgXeQepoHkHSQuy6NgaEb94'\

# The API URL is https://blockchain.info/unspent?active=<address>
# It returns a JSON object with a list "unspent_outputs", containing UTXO, like this:
#{ "unspent_outputs":[
# {
# "tx_hash":"ebadfaa92f1fd29e2fe296eda702c48bd11ffd52313e986e99ddad9084062167",
# "tx_index":51919767,
# "tx_output_n": 1,
# "script":"76a9148c7e252f8d64b0b6e313985915110fcfefcf4a2d88ac",
# "value": 8000000,
# "value_hex": "7a1200",
# "confirmations":28691
# },
# ...

resp = requests.get('https://blockchain.info/unspent?active=%s' % address)
utxo_set = json.loads(resp.text)["unspent_outputs"]
# print(utxo_set)

sum = 0
for utxo in utxo_set:
    sum += utxo['value']
    print("%s:%d - %ld Satoshis" % (utxo['tx_hash'], utxo['tx_output_n'], utxo['value']))
print("%s has %.8f BTC" %(address, sum/1e8))