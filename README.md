# GTM Platform OAuth2 Client Example Implementation

## General things regarding this example
1. Architecture
    * The `node` server with `express` as a framework is only used as a wrapper for this example and is not directly relevant to the OAuth implementation.
2. Principles
    * Even though this example is written in JS it can be translated to any other language as well.
    * I've decided on JS for this example as it might be the most common sense language out there.
    * Another reason is the `middleware` architecture of `express`, which is quite easy to understand.

## Requirements
* NodeJS
* yarn/npm

## Installation
* Clone the Repository
    * `git clone <REPO_URL>`
    * `cd gtm-oauth-example`
* Install dependencies (locally in project scope)
    * `yarn install` or `npm install`
* Start the dev server
    * `node server.js`
* Open URL
    * [http://localhost:3030](http://localhost:3030)

## Config
Before trying out this example you need to enter your own configuration.
* Copy `/config/config.local.js.dist` to `/config/config.local.js`
* Enter your config. You can find everything you need within the docs I've already sent you.

## OAuth2 Authorization Code Flow
1. Authorize
    * Middleware: `Authorize.js`
        * Starts the authorization process.
        1. Redirects the user to the GTM login page.
        2. Once the user is logged in and authorized the requested app,
        the server returns the user to the given `redirect_uri`,
        passing the `authorization code` as a `query parameter`.
        3. If the authorization code is given we just take it to the next middleware.
    * Notice:
        * An authorization code can only be used once.
2. Request Access Token
    * Middleware: `RequestAccessToken.js`
        * Requests an access token with the given authorization code
        1. Requests access token
        2. Take the access token to the next middleware
    * Notice:
        * An access token can be used until it's expired
        * You maybe wanna persist the retrieved access token up to the point of expiration
        * Else you'd need to request a new access token for every resource request against the GTM platform
3. Request User Data
    * Middleware: `RequestUserData.js`
        * Requests user data from the GTM Platform
    * Notice:
        * There you go, you now have the user to use in your own app.