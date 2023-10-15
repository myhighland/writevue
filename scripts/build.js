const fs = require("fs");
const execa = require('execa');

//获取所有需要打包的目录
const dirs = fs.readdirSync('packages').filter(dir=>{
    if(!fs.statSync(`packages/${dir}`).isDirectory()) return false;
    return true;
})


async function build(target) {
    await execa('rollup', ['-c', '--environment', `TARGET:${target}`], {
        stdio: 'inherit' //将子进程的打包信息共享给父进程
      })
}

function runParallel(targets,buildFunc) {
    const res = [];
    for (const item of targets) {
        const p = buildFunc(item)
        res.push(p)
      }
    return Promise.all(res);
}

runParallel(dirs,build);