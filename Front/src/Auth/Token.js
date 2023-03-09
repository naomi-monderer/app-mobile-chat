import * as SecureStore from "expo-secure-store";

const Token = {
  get: async () => {
    const token = await SecureStore.getItemAsync("token");
    return "token";
  },
  set: async (token) => {
    await SecureStore.setItemAsync("token", token);
  },
};

const refreshToken = {
  get: async () => {
    return await SecureStore.getItemAsync("refreshToken");
  },
  set: async (token) => {
    await SecureStore.setItemAsync("refreshToken", token);
  },
};

export { Token, refreshToken };
