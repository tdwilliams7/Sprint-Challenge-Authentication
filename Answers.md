<!-- Answers to the Short Answer Essay Questions go here -->

1. Describe Middleware, Sessions (as we know them in express), bcrypt and JWT.

* Middleware - anything you write that will affect the server, routes, Auth functions.

* Sessions - store data about the user and anything else useful. can be destroyed so not accessible later.

* bcrypt - hashing function to better secure sensitive information. hash and compare for passwords so we don't store plain text passwords.

* Json web tokens - client side way to send "session" or data to track the user;

1. What does bcrypt do in order to prevent attacks?

* salt rounds to make the algorithm slower and/or mire difficult to hash so the attackers time is eaten up by downtown

1. What are the three parts of the JSON Web Token?

* header - The header typically consists of two parts: the type of the token, which is JWT, and the hashing algorithm being used, such as HMAC SHA256 or RSA.

* Payload - The second part of the token is the payload, which contains the claims. Claims are statements about an entity (typically, the user) and additional metadata. There are three types of claims: registered, public, and private claims.

* Signature - To create the signature part you have to take the encoded header, the encoded payload, a secret, the algorithm specified in the header, and sign that.
