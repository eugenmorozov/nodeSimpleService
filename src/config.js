const config = {
    'local': {
        mongo: 'mongodb://6806c1fde49be233:9192096559f89a568fe3a524@95.163.183.39:27017/MongoDB-7846',
    }
};
module.exports = function(mode) {
    return config[mode || process.argv[2] || 'local'] || config.local;
};
