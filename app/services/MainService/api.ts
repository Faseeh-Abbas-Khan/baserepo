import {ApiResponse, ApisauceInstance, create} from 'apisauce';
import {getGeneralApiProblem} from './apiProblem';
import {ResponseKind, type ApiConfig, type ResponseType} from './api.types';
import Config from 'react-native-config';

/**
 * Configuring the apisauce instance.
 */
export const DEFAULT_API_CONFIG: ApiConfig = {
  url: Config.BASEURL,
  timeout: 35000,
};

/**
 * Manages all requests to the API. You can use this class to build out
 * various requests that you need to call from your backend API.
 */
export class Api {
  apisauce: ApisauceInstance;
  config: ApiConfig;

  /**
   * Set up our API instance. Keep this lightweight!
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config;
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: 'application/json',
      },
    });
  }

  setBaseUrl(baseUrl: string) {
    this.apisauce.setBaseURL(baseUrl);
  }

  async getApiConfig(isLoggedIn: boolean, contentType?: string, header?: any) {
    let headers = {
      ...header,
    };
    if (isLoggedIn) {
      // const user = await firebase.auth().currentUser
      // if (user) {
      // let accessToken = await auth().currentUser.getIdToken(true)
      let accessToken = '';
      if (accessToken) {
        headers = {
          ...headers,
          Authorization: `Bearer ${accessToken}`,
        };
        // }
      } else {
        console.log('no user in firebase, getApiConfig');
      }
    }
    if (contentType) {
      headers = {
        ...headers,
        'Content-Type': contentType,
      };
    }
    return {headers};
  }

  async getResponse<T>(
    response: ApiResponse<T>,
    hideError?: boolean,
  ): Promise<ResponseType<T>> {
    if (!response.ok) {
      let problem = getGeneralApiProblem(response);
      if (problem) {
        if (!hideError) {
          console.log(problem.kind, 'Please try again.');
        }
        return problem;
      }
    }
    const res: any = response.data;
    return {kind: ResponseKind.OK, data: res.result};
  }
}

export const api = new Api();
