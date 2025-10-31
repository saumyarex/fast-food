import { CreateUserParams, SignInParams } from "@/type";
import { Account, Avatars, Client, Databases, ID, Query, Storage, TablesDB } from "react-native-appwrite";

export const appwriteConfig = {
    endpoint : process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
    projectID : process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
    platform : "com.saumya.fastfood",
    databaseID : process.env.EXPO_PUBLIC_APPWRITE_DB_ID!,
    userTableID : process.env.EXPO_PUBLIC_APPWRITE_USER_TABLE!,
    categoriesTableID : process.env.EXPO_PUBLIC_APPWRITE_Categories_TABLE!,
    menuTableID : process.env.EXPO_PUBLIC_APPWRITE_Menu_TABLE!,
    customizationTableID : process.env.EXPO_PUBLIC_APPWRITE_CUSTOMIZATION_TABLE!,
    menuCustomizationTableID : process.env.EXPO_PUBLIC_APPWRITE_MENU_CUSTOMIZATION_TABLE!,
    bucketID : process.env.EXPO_PUBLIC_APPWRITE_BUCKET_ID! 
}



const client = new Client()
    .setEndpoint(appwriteConfig.endpoint) 
    .setProject(appwriteConfig.projectID); 

const account = new Account(client);
const tablesDB = new TablesDB(client);
const avatar = new Avatars(client);
export const databases = new Databases(client);
export const storage = new Storage(client);


export const createAccount = async({name, email, password} : CreateUserParams) => {

    try {

        console.log("name is:", name)
        const avatarURL = avatar.getInitials({name:name}); 

        console.log("Avatar url: ", avatarURL)
        if(!avatarURL) throw new Error("Account creation failed. Please try again!");

        const newAccount = await account.create({
            userId: ID.unique(),
            email: email,
            password: password,
            name: name
        })

        if(!newAccount) throw new Error("Account creation failed. Please try again!");

        await signIn({email,password});

        return await tablesDB.createRow({
            databaseId: appwriteConfig.databaseID,
            tableId: appwriteConfig.userTableID,
            rowId: ID.unique(),
            data: {
                name: name,
                email: email,
                accountID: newAccount.$id
            },
        });

    } catch (error) {
        if(error instanceof Error){
            throw new Error(error.message)
        }else{
            throw new Error(String(error))
        }
    }
}

export const signIn = async({email, password}:SignInParams) => {

    try {
        const session =  account.createEmailPasswordSession({
            email: email,
            password: password
        });

        if(!session) throw new Error("Account login failed. Please try again!");

        return session;
    } catch (error) {
         if(error instanceof Error){
            throw new Error(error.message)
        }else{
            throw new Error(String(error))
        }
    }
}

export const getCurrentUser = async() => {
    try {
        const currentAccount = await account.get();

        if(!currentAccount) throw new Error("No accoutn logged in");

        const currenUser = await tablesDB.listRows({
            databaseId: appwriteConfig.databaseID,
            tableId: appwriteConfig.userTableID,
            queries: [Query.equal("accountID", [currentAccount.$id])], 
        });

        if(!currenUser) throw new Error("No user logged in");

        return currenUser.rows[0]
        
    } catch (error) {
        if(error instanceof Error){
            throw new Error(error.message)
        }else{
            throw new Error(String(error))
        }
    }
}