# Express Server

This repository is made for making servers to play, practice & get familiar with Express & its various functionalities.

Tech Used: npm, express, openssl, fs (filesystem), Postman

## Installation & Running

Install this project in your local development environment, follow the following terminal commands:

```bash
git clone https://github.com/iharshka/express-server Express-server

cd Express-server

```

After cloning the repository, node is assumed to be already installed on the machine then Express needs to be installed in the directory Express-server. Run:

```bash

npm install express

```

Now, to run any of the files. Run the following command:

```bash

node hospital.js

or

node fileServer.js

or

node todoServer.js

or

node storedTodoServer.js

```

To initialize your own directory with Express, follow instructions at https://expressjs.com/en/starter/installing.html

## Files & their stories

- **_server1.js_**: first express server I made, simple logic to take user & n from query params. Authenticates user then based on this & computes square of n
- **_server2.js_**: made this server to run server1 & server2 parallely on the same port. It said already occupied port. Changed it to 3001
- **_hospital.js_**: Added PUT/POST/GET/DELETE route handlers. Added validation to the PUT/POST/DELETE methods. Also, added SSL certificates when I found localhost:3000 is only working with http & not https
- **_fileServer.js_**: file management system on the server. Made this to play how fs works server side.
- **_todoServer.js_**: This one will be a bit complex. An app where I can see my todos of the day, add new ones, delete previous ones, modify previous ones etc.
- **_storedTodoServer.js_**: This one was a bit more complex than todoServer.js because the todos was now saved in a file. Used Async await, Promises, fs to achieve this server after lot of bugs. The server is programmed nicely so that if it encounters, it shows proper logs + response message as well making debugging easy. Also, this server uses functions for reading & writing Todos rather than writing them again & again.

## Generating self-signed certificates

Command to generate self signed SSL/TLS certificate using OpenSSL for local developement purposes for applications which requires secure connection over browser:

```bash
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes
```

**_openSSL_** invokes the command line toolkit which provides cryptographic functions and utilities for working with SSL/TLS certificates

**_req_** utility of the openssl toolkit, used for creating & processing certificate signing
requests (CSR) & self signed certificates

**_-x509_** specifies the req to generate self signed certificates instead of CSR to certificates authority

**_-newkey rsa:4096_** specifies that a new RSA pair of 4096 bits should be generated along with certificates

**_-keyout key.pem_** saves the private key to output file key.pem

**_-out cert.pem_** specifies the output filename where self signed certificate will be saved

**_-days 365_** specifies the validity of the certificate

**_-nodes_** specifies the private key should not be encrypted with paraphrasing to enable easy usage in developement process

After running this command, OpenSSL will prompt to enter information for the certificate (such as country, state, organization, etc.) and will then generate the cert.pem & key.pem files in the current directory based on the specified options.

After the cert.pem & key.pem files are generated successfully, we have to add certain lines of code to our expess application in order https works (can also be found on /hospital.js):

```

const https = require("https);
const fs = require("fs");

const port = 443; //default port https route handlers listen on
const options = {
    key: fs.readFileSync("key.pem"),
    cert: fs.readFileSync("cert.pem")
};

https.createServer(options, app).listen(port, () => {
  console.log(
    `Server is running on port ${port} at https://localhost:${port}/`
  );
});

```

Add above lines in your express.js files for https route to work.

## What is RSA? How does encryption - decryption works?

RSA, Rivest Shamir Adleman, is an asymmentric encryption algorithm used for communicating over the insecure networks. RSA generates a pair of keys, private key & public key which are used in the process of encryption by the sender and decryption by the recipient. RSA algorithm also creates a digital signatures which enables secure communication over untrusted browsers/networks.

RSA encryption & decryption involves two or more machines each having their own RSA key pairs. So, sender's (owner) signs a message/data with their private key & then the recipients verify the signature with the sender's public key. And senders over the network send the messages which is encrypted with the receiver's public key. This encrypted message (also called cipher text)
can only be decrypted using owner's private key.

Public key is accessible to everyone who wants to make secure connection channel with the owner's machine. Sender's sends encrypted messages with the public keys which can only be decrypted with the with the corresponding private key.

Public keys & Private keys are represented as a large number derived from product of 2 prime numbers, randomly selected and kept secret. Private keys are mathematically related to the Public keys & is used to perform the decryption that are computationally infeasible with public key alone.

**_But, how does encryption & decryption works?_**

_Encryption by Public key:_ RSA encrypts a message 'm', the sender uses public key('e') to perform the following operation:

```
c = m ^ e (mod n)
```

where m is the message, c is the cipher text, e is the public exponent, n is the modulus derived from p & q (assumed random prime numbers).

_Decryption by Private key:_ RSA decrypts the cipher text c to original message 'm', the recipient (owner of RSA pair) uses privaye key('e') to perform the following operation:

```
m = c ^ d (mod n)
```

where d is the private exponent, m is the original message, n is the modulus derived from p & q.

## 👨🏻‍🎓 About Me

I'm Harsh, a problem solver, frontend developer & DevOps Eg, soon to be on backend and new techs (#Web3?, adaptive, u say). I want to work on a problem statement where I can cater to hundred thousands or million people or the one which keeps me stay up all night. Thank you for showing interest on this project. Neverming connecting with me on socials. See you soon.

[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://iharshka.me/)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/iharshka)
[![twitter](https://img.shields.io/badge/twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/iharshka)
