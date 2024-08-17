import conf from '@/conf/conf';
import { Client, Account, ID } from 'appwrite';

interface CreateUserAccount {
  email: string;
  password: string;
  name: string;
}

interface LoginUserAccount {
  email: string;
  password: string;
}

const appwriteClient = new Client();

appwriteClient.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);

export const account = new Account(appwriteClient);

class AppwriteService {
  // Create a new record of user inside Appwrite
  async createUserAccount({ email, password, name }: CreateUserAccount) {
    try {
      const userAccount = await account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (userAccount) {
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  // Login a user with email and password
  async login({ email, password }: LoginUserAccount) {
    try {
      return account.createEmailPasswordSession(email, password);
    } catch (error: any) {
      throw error;
    }
  }

  async isLoggedIn(): Promise<boolean> {
    try {
      const data = await this.getCurrentUser();
      return Boolean(data);
    } catch (error) {
      
    }
    return false;
  }

  async getCurrentUser() {
    try {
      return account.get();
    } catch (error) {
      console.log('getCurrentUser error: ', error);
    }

    return null;
  }

  async logout() {
    try {
      return await account.deleteSession('current');
    } catch (error) {
      console.log('logout error: ', error);
    }
  }
}

const appwriteService = new AppwriteService();

export default appwriteService;