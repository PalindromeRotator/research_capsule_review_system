module.exports = (sequelize, Sequelize) => {
    const Capsule = sequelize.define("capsule", {
        title: {
            type: Sequelize.STRING
        },
        section: {
            type: Sequelize.STRING
        },
        uid_owner: {
            type: Sequelize.STRING
        },
        name_owner: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.STRING
        },
        file: {
            type: Sequelize.BLOB
        },
        reviewers: {
            type: Sequelize.STRING
        }
    });

    return Capsule;
};