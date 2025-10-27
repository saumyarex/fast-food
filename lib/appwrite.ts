import { CreateUserParams, SignInParams } from "@/type";
import { Account, Avatars, Client, Databases, ID, Query, TablesDB } from "react-native-appwrite";

export const appwriteConfig = {
    endpoint : process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
    projectID : process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
    platform : "com.saumya.fastfood",
    databaseID : process.env.EXPO_PUBLIC_APPWRITE_DB_ID!,
    userTableID : process.env.EXPO_PUBLIC_APPWRITE_USER_TABLE!
}



const client = new Client()
    .setEndpoint(appwriteConfig.endpoint) // Your API Endpoint
    .setProject(appwriteConfig.projectID); // Your project ID )

const account = new Account(client);
const database = new Databases(client);
const tablesDB = new TablesDB(client);
const avatar = new Avatars(client);

// const result = await account.create({
//     userId: '<USER_ID>',
//     email: 'email@example.com',
//     password: '',
//     name: '<NAME>' // optional
// });

export const createAccount = async({name, email, password} : CreateUserParams) => {

    try {
        const newAccount = await account.create({
            userId: ID.unique(),
            email: email,
            password: password,
            name: name
        })

        if(!newAccount) throw new Error("Account creation failed. Please try again!");

        await signIn({email,password});
        const avatarURL = avatar.getInitials({name}); 

        return await tablesDB.createRow({
            databaseId: appwriteConfig.databaseID,
            tableId: appwriteConfig.userTableID,
            rowId: ID.unique(),
            data: {
                name: name,
                email: email,
                avatar: avatarURL,
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