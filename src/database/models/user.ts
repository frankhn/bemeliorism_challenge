import {
  Model,
  DataTypes,
} from 'sequelize';
import db from '.';
import Encrypt from '../../helpers/encryption'

export class User extends Model {
  public id: string;
  public firstName: string;
  public lastName: string;
  public password: string;

  public readonly createdAt: Date
  public readonly updatedAt: Date

  public static associations: {

  };


  toJSON() {
    return {
      ...this.get(),
      password: undefined
    };
  }
}
User.init(
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    firstName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: db,
    modelName: 'user',
    timestamps: true,
    paranoid: true,
    tableName: 'users',
  },
);

User.beforeCreate((user) => {
  if (user.password) {
    user.password = Encrypt.encrypt(user.password);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    user.gender = `${user.gender}`?.toUpperCase();
  }
});
