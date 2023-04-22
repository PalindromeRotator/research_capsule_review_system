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
            type: Sequelize.STRING
        },
        reviewers: {
            type: Sequelize.STRING
        },
        comments: {
            type: Sequelize.STRING
        },
        blob_file: {
            type: Sequelize.BLOB
        },
        grade: {
            type: Sequelize.STRING
        }
    });

    return Capsule;
};