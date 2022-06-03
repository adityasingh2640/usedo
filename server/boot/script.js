var loopback = require('loopback');
var memory = loopback.createDataSource({
    connector: loopback.Memory,
    file: "db.json"
});
module.exports = function (app, cb) {
    updateDatabaseSchema(app).then(() => {
        process.nextTick(cb);
    });
};
async function updateDatabaseSchema(app) {
    const dataSource = app.dataSources.db;

    for (let model of app.models()) {
        if (await doesModelNeedUpdate(dataSource, model.modelName) === true) {
            await updateSchemaForModel(dataSource, model.modelName);
        }
    }
}

function doesModelNeedUpdate(dataSource, model) {
    return new Promise((resolve, reject) => {
        dataSource.isActual(model, (err, actual) => {
            if (err) reject(err);
            resolve(!actual);
        });
    });
}

function updateSchemaForModel(dataSource, model) {
    return new Promise((resolve, reject) => {
        dataSource.autoupdate(model, (err, result) => {
            if (err) reject(err);
            console.log(`Autoupdate performed for model ${model}`);
            resolve();
        });
    });
}