const StorageKeys = {
    ACCESS_TOKEN: "accessToken",
    REFRESH_TOKEN: "refreshToken",
}

const UserRoles = {
    USER: "user",
    ADMIN: "admin",
}

const AvailableUserRoles = Object.values(UserRoles);


export {
    StorageKeys,
    UserRoles,
    AvailableUserRoles,
}