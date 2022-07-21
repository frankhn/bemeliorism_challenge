import {
    Model,
    DataTypes,
} from 'sequelize';
import db from '.'
import { User } from './user';

export class Preference extends Model {
    public id: string;
    public name: string;
    public description: string;
    public userId: User

    public readonly createdAt: Date
    public readonly updatedAt: Date

    public static associations: {

    };


    toJSON() {
        return {
            ...this.get(),
        };
    }
}
Preference.init(
    {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
        name: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        description: {
            allowNull: false,
            type: DataTypes.TEXT,
        },
        userId: {
            allowNull: false,
            type: DataTypes.UUID
        }
    },
    {
        sequelize: db,
        modelName: 'user',
        timestamps: true,
        paranoid: true,
        tableName: 'users',
    },
);

