import { Preference } from "./preference";
import { User } from "./user";

User.hasMany(Preference, {
    foreignKey: "userId",
    as: "preferences"
})

Preference.belongsTo(User, {
    foreignKey: "userId",
})