import { GeneralApiProblem } from "./apiProblem"
/**
 * The options used to configure apisauce.
 */
export interface ApiConfig {
  /**
   * The URL of the api.
   */
  url: string

  /**
   * Milliseconds before we timeout the request.
   */
  timeout: number
}
export enum ResponseKind {
  OK="ok",
  DUPLICATE="duplicate",
  ALREADY_EXISTS="alreadyExists",
  NOT_FOUND="not-found",
  BAD_REQUEST ="bad-request",
  FORBIDDEN ="forbidden"
} 
interface backendResponse<T> {
  result?:T,
  errors?:string,
  errorDetails?:null,
  status:number
}
type SuccessResponse<T> = {kind:ResponseKind.OK, data: backendResponse<T>["result"]}
export type ResponseType<T> = SuccessResponse<T> | GeneralApiProblem
