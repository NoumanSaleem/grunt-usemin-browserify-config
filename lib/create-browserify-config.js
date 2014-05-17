var fs = require('fs'),
	path = require('path'),
	externalModuleRe = /require\([\'"]([\w\.\-]+)[\'"]\)/gm,
	aliasRuleRe = /<!--(?:\s?)+alias\:([\w\.\-,]+)(?:\s?)+-->/gm;

function getExternalModules(files) {
	var external = [];

	files.forEach(function (file) {
		var txt = fs.readFileSync(file),
			match;

		while((match = externalModuleRe.exec(txt))) {
			var module = match[1];
			if (external.indexOf(module) === -1) external.push(match[1]);
		}
	});

	return external;
}

function createConfig(context, block) {
	var aliasRules = aliasRuleRe.exec(block.raw.join('\n')),
		aliases = aliasRules ? aliasRules[1].split(',') : [],
		files = {
			dest: path.join(context.outDir, block.dest),
			src: context.inFiles.map(function (filePath) {
				return path.join(context.inDir, filePath);
			})
		},
		options = {
			external: getExternalModules(context.inFiles),
			alias: []
		};

	aliases.forEach(function (alias) {
		context.inFiles.some(function (filePath) {
			var basename = path.basename(filePath, path.extname(filePath));
			if (alias === basename) {
				options.alias.push(filePath + ':' + basename);
				return true;
			}
		});
	});

	context.options[block.dest] = {
		files: [files],
		options: options
	};
	context.outFiles = [block.dest];
	return true;
}

module.exports = createConfig;
