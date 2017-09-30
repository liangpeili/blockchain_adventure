#/usr/bin/env python
#coding:utf-8

import rsa

# 生成密钥

(pk, sk) = rsa.newkeys(1024)

# 密钥保存导入
# 保存密钥
with open('public.pem', 'w+') as f:
    f.write(pk.save_pkcs1().decode())

with open('private.pem', 'w+') as f:
    f.write(sk.save_pkcs1().decode())

# 导入密钥
with open('public.pem', 'r') as f:
    pk = rsa.PublicKey.load_pkcs1(f.read().encode())

with open('private.pem', 'r') as f:
    sk = rsa.PrivateKey.load_pkcs1(f.read().encode())

# 加密解密

message = 'hello'
crypto = rsa.encrypt(message.encode(), pk)
message = rsa.decrypt(crypto, sk).decode()
print(message)

# 数字签名

sig = rsa.sign(message.encode(), sk, 'SHA-256')
result = rsa.verify(message.encode(), sig, pk)
print(result)