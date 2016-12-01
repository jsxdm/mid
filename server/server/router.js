'use strict'
const url = require('url');
const path = require('path');
const fs = require('fs');
const watcher = require("./base/watch");
const getData = require('./base/getData');
const render = require('./base/render').render;

let route = (req, res) => {
	try {
		var reqUrl = url.parse('http://' + req.headers.host + req.url, true);
	} catch (err) {
		console.log('Route Parse Error:', req.url)
		res.writeHead(500, {
			'Content-Type': 'text/plain'
		});
		res.end('url is wrong');
		return
	}
	let hostname = reqUrl.hostname,
		pathname = reqUrl.pathname,
		modUrl = pathname.substr(1).replace(/\/+/g, '/').split('/'),
		fileType = pathname.match(/(\.[^.]+|)$/)[0].substr(1);

	// favicon.ico
	// if (fileType == '.ico') {
	// 	fs.readFile('./favicon.ico', (err, html) => {
	// 		if (err) {
	// 			res.writeHead(500, {
	// 				'Content-Type': 'text/plain'
	// 			});
	// 			res.end(err);
	// 		}
	// 		res.writeHead(200, {
	// 			'Server': ETC.server,
	// 			'Content-Type': 'image/x-icon;charset=utf-8'
	// 		});
	// 		res.end(html);
	// 	});
	// 	return;
	// }

	// 获取URL参数
	// console.log('---------------------------------------------');
	// console.log(reqUrl);
	req.__get = {};
	for (var k in reqUrl.query) {
		req.__get[k.replace(/[<>%\'\"]/g, '')] = reqUrl.query[k];
	}
	/*
	url 格式 [/ 地址/...]模块文件名/方法名/[参数] 
	3 mod/fn/param
	2 mod/../param
	1 mod
	*/
	// console.log(modUrl)
	if (modUrl.length < 3) {
		modUrl.splice(1, 0, 'index');
	}
	// console.log(modUrl)
	let mods = modUrl.splice(-3),
		modName = mods[0] || ETC.defaultMod,
		modFun = mods[1] || 'index',
		modParam = mods[2] || null;
	// console.log(reqUrl.hostname)
	let controllerPath = path.resolve(__dirname, PATH.apps, PATH[HOST[hostname]], PATH.controller),
		modPath = path.resolve(controllerPath, modName + '.js');
	// console.log(reqUrl)

	// console.log(modPath);
	if (!fs.existsSync(modPath)) {
		res.writeHead(404, {
			'Content-Type': 'text/plain'
		});
		res.end('404 Not Found');
		console.log('cannot found modPath:\n' + modPath);
	} else {
		// console.log(req)
		let modJs = require(modPath);
		// console.log(modJs)
		// console.log(modFun)
		let extendObj = {
			hostname,
			req,
			res,
			getData,
			render
		};
		Object.assign(modJs['controllerObj'], extendObj);
		// watcher
		watcher.takeCare(controllerPath);

		modJs['controllerObj'][modFun](modParam);
	}
}
module.exports = route;