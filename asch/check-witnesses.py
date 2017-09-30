#/usr/bin/env python
#coding:utf-8

import requests 

def get_addr_and_pubkey(name):
    r = requests.get(url='http://mainnet.asch.so:80/api/delegates/get', params={'username':name})
    addr = r.json()['delegate']['address']
    pubkey = r.json()['delegate']['publicKey']
    return addr, pubkey

def get_voteme(addr):
    # 根据地址获取其投票列表
    r = requests.get(url='http://mainnet.asch.so:80/api/accounts/delegates', params={'address':addr})
    r_len = len(r.json()['delegates'])
    r_set = set()
    for i in range(r_len):
        r_set.add(r.json()['delegates'][i]['username'])
    return r_set 

def get_mevote(pubkey):
    # 根据公钥查询哪些人为其投了票
    r = requests.get(url='http://mainnet.asch.so:80/api/delegates/voters', params={'publicKey':pubkey})
    r_len = len(r.json()['accounts'])
    r_set = set()
    for i in range(r_len):
        r_set.add(r.json()['accounts'][i]['username'])
    return r_set 

def get_rate(name):
    # 根据用户名查询其排名
    r = requests.get(url='http://mainnet.asch.so:80/api/delegates/get', params={'username':name})
    rate = r.json()['delegate']['rate']
    return rate

def check_vote(name1, name2):
    # 查询俩人是否互投
    pass


if __name__ == "__main__":
    name = 'liangpeili'
    addr, pubkey = get_addr_and_pubkey(name)
    voteme_set = get_voteme(addr)
    mevote_set = get_mevote(pubkey)
    print("你已投对方但对方没有回投的节点有：" + str(voteme_set-mevote_set))
    print("对方已投你但你没有回投的节点有：" + str(mevote_set-voteme_set))
    print(get_rate(name))
    

