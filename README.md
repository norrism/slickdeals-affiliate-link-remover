# Slickdeals Affiliate Link Remover

Description
-
Slickdeals Affiliate Link Remover is a browser extension userscript that finds affiliate links on Slickdeals web pages and replaces or appends them with their actual destination links.

Purpose
-
This extension was developed to protect user privacy against tracking data and to help maintain an uninterrupted web browsing experience. Affiliate links are useful for the web pages that host them, however they are not very beneficial to web users. These types of links track user data and can also result in web pages not loading correctly given the presence of ad blockers or disabled hosts. Affiliate links interfere with the web browsing experience and this extension aims to limit their negative effects on users.

Limitations
-
It must be pointed out that this extension has some limitations. First and foremost, this extension was developed to work with the new Slickdeals website design. It has not been tested with the old site design and requests to support the old design are not being accepted at this time. 

While the extension is successfully able to replace affiliate links in the 'Original Post' and 'Comments' section of Slickdeals web pages, it is unable to do this under the 'Deal Details' section. I have not yet found a way to determine the direct URLs of affiliate links in the 'Deal Details' section of the website. A slight workaround for this limitation has been implemented that appends possible direct links after the affiliated links. Unfortunately these links may not be correct because their correctness depends on consistent link ordering between the 'Original Post' and 'Deal Details' sections of the site. If anyone is able to find a better solution to this problem, please submit a pull request.

Install & Update
-
This userscript is meant to be used with the extensions Greasemonkey for Mozilla Firefox and Tampermonkey for Google Chrome. It may or may not be compatible with other extensions or web browsers.

1. Install the Greasemonkey or Tampermonkey extension for your web browser.
2. Go to the [raw userscript source](https://github.com/norrism/slickdeals-affiliate-link-remover/raw/master/slickdeals-affiliate-link-remover.user.js) to install or update to the latest version of this userscript.
