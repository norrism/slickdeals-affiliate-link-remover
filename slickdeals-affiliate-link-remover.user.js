// ==UserScript==
// @name	   Slickdeals Affiliate Link Remover
// @author	 Michael Norris
// @namespace  http://norrism.com
// @version	1.0.0
// @description Removes affiliate links from Slickdeals pages and replaces them with their actual destination links
// @match	  http://slickdeals.net/*
// @match	  https://slickdeals.net/*
// @require	http://code.jquery.com/jquery-latest.js
// ==/UserScript==

// Returns true if link contains an attribute with the destination URL
function hasDestinationURL(link){
	if(link.href.indexOf("://slickdeals.net") != -1 && (link.href.indexOf("http%3A") != -1 || link.href.indexOf("https%3A") != -1)){
		return true;
	}	
	return false;
}

// Returns decoded version of URL given an encoded affiliate link
function decodeLinkToURL(link){
	var url_encoded = link.href.substring(link.href.indexOf("&u2=") + 4); // Strips Slickdeals URL from actual destination URL
	var url_decoded = decodeURIComponent(url_encoded);
	return url_decoded;
}

function isAffiliateLink(link){
	if(link.href.indexOf("://slickdeals.net") != -1 && link.href.indexOf("&lno=") != -1){
		return true;
	}
	return false;
}

// Returns the attribute 'lno' (link number) from a given link					  
function getLinkNumber(link){
	var attributes = link.href.split("&");
	for(var i = 0; i < attributes.length; i++){
		if(attributes[i].indexOf("lno=") != -1){
			return attributes[i].substr(4);
		}
	}
}

// Returns true if link resides in the comment section of webpage rather than the 'Deal Details' section
function isCommentLink(link){
	if(link.href.indexOf("&sdop") == -1){
		return true;
	}
	return false;
}

// Returns the 'trd' attribute from a link, which may include a description of the link
function getLinkTRD(link){
    var attributes = link.href.split("&");
	for(var i = 0; i < attributes.length; i++){
		if(attributes[i].indexOf("trd=") != -1){
            var desc = attributes[i].substr(4).replace(/\+/g, " ");
			return desc;
		}
	}
}

var page_links, curr_link, decoded_URL, link_num;
var fixed_post_links = {};
var fixed_post_trds = {};

// First replace affiliate links from the 'Original Post' and 'Comments' sections with direct links

page_links = document.getElementsByTagName('a');
for(var i = 0; i < page_links.length; i++){
	curr_link = page_links[i];
	
	// Proceed only if we know the actual destination URL
	if(hasDestinationURL(curr_link)){
		link_num = getLinkNumber(curr_link);
		decoded_URL = decodeLinkToURL(curr_link);
		
		// Keep track of Original Post link ordering and details for later use
		if(!isCommentLink(curr_link)){
			fixed_post_links[link_num] = decoded_URL;
            fixed_post_trds[link_num] = getLinkTRD(curr_link);
		}
	
		curr_link.href = decoded_URL;
		curr_link.removeAttribute("onclick");
	}
}

// Copy unaffiliated 'Original Post' links into 'Deal Details' section
// Note: This assumes that link ordering is consistent between the Original Post and Deal Details section. This may not always be the case, so possible direct links do not replace original links, but are instead appended to them.

for(var i = 0; i < page_links.length; i++){
	curr_link = page_links[i];
	if(isAffiliateLink(curr_link)){
		link_num = getLinkNumber(curr_link);

        $(curr_link).after(' <a style="font-size:smaller;color:#6FA02E" title="' + fixed_post_trds[link_num] + ' (direct link may be incorrect)" href=' + fixed_post_links[link_num] + '>[Direct Link]</a>');
	}
}
