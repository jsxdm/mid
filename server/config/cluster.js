// clusterEnable
const cluster = require('cluster');
const CFonts = require('cfonts');
const cpuNums = +ETC.cpuNums || require('os').cpus().length;
module.exports = clusterEnable => {
	for (let i = 0; i < cpuNums; i++) {
		cluster.fork();
	}
	cluster.on('death', worker => {
		console.log('worker ' + worker.pid + ' died');
		cluster.fork();
	})
	cluster.on('exit', worker => {
		let st = new Date;
		st = st.getFullYear() + '-' + (st.getMonth() + 1) + '-' + st.getDate() + ' ' + st.toLocaleTimeString();
		console.log('worker ' + worker.process.pid + ' died at:', st);
		cluster.fork();
	})

	// CFonts
	CFonts.say('TIRGER', {
		font: '3d',
		align: 'left',
		colors: ['white', 'black'],
		background: 'Black',
		letterSpacing: 1,
		lineHeight: 1,
		space: true,
		maxLength: '0'
	});
}