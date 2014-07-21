'use strict';

var lineReader = require('line-reader');
var fs = require('fs');

var artist = null;
var lines = [];
var startsWithThe = /^the[ -_]/;
var allNonWordChars = /[^a-z0-9\-\s]/g;
var allSpaceChars = /\s/g;

var all_files_filename = process.argv[2] || 'pls-all-files';
function writeLines(artist,lines){
	artist = artist.toLowerCase();
	if(startsWithThe.test(artist)){
		artist = artist.substring(4) + "-" + artist.substring(0,3);
	}
	var pls_filename = 'pls-' + artist.
		replace(allNonWordChars,'').
		replace(allSpaceChars,'-');
	//console.log(artist + "    " + lines.length + " lines");
	fs.writeFileSync(pls_filename,lines.join('\n') + "\n");
}

function groupByArtist(line,last) {
	var line_artist = line.substring(0,line.indexOf('/'));
	if( artist === null) {
		artist = line_artist;
	}
	if( artist.toString() !== line_artist.toString() && lines.length > 0){
		writeLines(artist,lines);			
		artist = line_artist.toString();
		lines = [];
	}
	lines.push(line);

	if(last){
		writeLines(artist,lines);			
	}
}

lineReader.eachLine( all_files_filename, groupByArtist);
