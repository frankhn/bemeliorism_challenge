import { Preference } from "./preference";
import { User } from "./user";

User.hasMany(Preference, {
    foreignKey: "id",
    as: "preferences"
})

Preference.belongsTo(User, {
    foreignKey: "id"
})