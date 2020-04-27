let client = require('scp2');

client.scp('./dist', {
    'host': '47.101.139.100',
    'port': '22',
    'username': 'root',
    'password': '123123..0a',
    'path': '../usr/sagari-forward/dist'
}, err => {
    if (!err) {
        console.log('项目发布完毕');
    } else {
        console.log('err', err);
    }
});
