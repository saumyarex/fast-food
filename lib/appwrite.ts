export const appwriteConfig = {
    endpoint : process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    projectID : process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
    platform : "com.saumya.fastfood",
    databaseID : process.env.EXPO_PUBLIC_APPWRITE_DB_ID,
    userTableID : process.env.EXPO_PUBLIC_APPWRITE_USER_TABLE
}