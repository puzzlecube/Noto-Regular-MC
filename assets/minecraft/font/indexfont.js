// indexfont.js v1.0.0 (License: 2-clause BSD)
var fs = require('fs');

fontlist = {
	providers: [
			/*{
				type: "ttf",
				file: "minecraft:noto-regular.ttf",
				shift: [0, 0],
				size: 14.0,
				oversample: 4.0
			}*/ // Sample
		]
};

// Read all the files in the directory
let allfiles = fs.readdirSync('./');
let filtered = []
for (fontfile of allfiles) {
	if (fontfile.match(/[to]tf/gu) != null) {
		console.log("\x1b[92Found font file "+fontfile+"\x1b[0m");
		filtered[filtered.length] = fontfile;
	} else {
		console.log("\x1b[93mSkipped "+fontfile+"\x1b[0m");
	}
}
var odir = './';

let rpfonts = []
for (font of filtered) {
	console.log("\x1b[92mCopying \x1b[94m"+font+"\x1b[0m")
	try {
		let copy = fs.renameSync(font,odir+'/'+font.toLowerCase()); // MC does not like capitals
	} catch (err) {
		console.log("Could not copy font file");
		os.exit(2);
	}
	rpfonts[rpfonts.length] = font.toLowerCase(); // This will be the name going into the JSON
}
for (font of rpfonts) {
	fontlist.providers[fontlist.providers.length] = {
		type: 'ttf',
		file: "minecraft:"+font,
		shift: [0,0],
		size: 14.0,
		oversample: 4.0
	};
}
try {
	let fontJSON = JSON.stringify(fontlist,null,2);
	console.log(fontJSON);
	let f = fs.writeFileSync(odir+'/default.json',fontJSON);
} catch (err) {
	console.log("Could not write json file");
}
