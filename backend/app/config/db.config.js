module.exports = {
    HOST: "TIDB_HOST",
    port: "TIDB_PORT",
    USER: "TIDB_USER",
    PASSWORD: "TIDB_PASSWORD",
    DB: "research_capsule_evaluation_system",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};