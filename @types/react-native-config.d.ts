declare module 'react-native-config' {
  export interface NativeConfig {
    BASEURL?: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
