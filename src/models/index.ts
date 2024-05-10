import User from "./User";
import UserToken from "./UserToken";

User.hasMany(UserToken, {
    foreignKey: 'user_id',
    as: 'tokens'
});

UserToken.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'user'
});



export {
    User,
    UserToken
};