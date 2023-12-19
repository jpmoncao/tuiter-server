import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import { Users } from './Users.js';

class UsersFollowers extends Model {
    id_user!: string;
    id_follower!: string;
}

UsersFollowers.init(
    {
        id_user: {
            type: DataTypes.CHAR(36),
            primaryKey: true,
            allowNull: false,
        },
        id_follower: {
            type: DataTypes.CHAR(36),
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'users_followers',
        modelName: 'UserFollower',
        createdAt: true,
        updatedAt: true,
    }
);

UsersFollowers.belongsTo(Users, { foreignKey: 'id_user' });
UsersFollowers.belongsTo(Users, { foreignKey: 'id_follower', as: 'Follower' });

export { UsersFollowers };
