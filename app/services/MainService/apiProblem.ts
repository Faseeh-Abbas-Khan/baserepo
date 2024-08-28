import { ApiResponse } from "apisauce"

export enum ErrorKind {
  BAD_DATA_ERROR = "bad-data",
  DUPLICATE = "duplicate",
  NOT_FOUND = "not-found",
  BAD_REQUEST = "bad-request",
  FORBIDDEN = "forbidden",
}

export type GeneralApiProblem =
  /**
   * Times up.
   */
  | { kind: "timeout"; temporary: true; data: any }
  /**
   * Cannot connect to the server for some reason.
   */
  | { kind: "cannot-connect"; temporary: true; data: any }
  /**
   * The server experienced a problem. Any 5xx error.
   */
  | { kind: "server"; data: any }
  /**
   * We're not allowed because we haven't identified ourself. This is 401.
   */
  | { kind: "unauthorized"; data: any }
  /**
   * We don't have access to perform that request. This is 403.
   */
  | { kind: "forbidden"; data: any }
  /**
   * Unable to find that resource.  This is a 404.
   */
  | { kind: "not-found"; data: any }
  /**
   * All other 4xx series errors.
   */
  | { kind: "rejected"; data: any }
  /**
   * Something truly unexpected happened. Most likely can try again. This is a catch all.
   */
  | { kind: "unknown"; temporary: true; data: any }
  /**
   * The data we received is not in the expected format.
   */
  | { kind: "bad-data"; data: any }
  | { kind: "duplicate"; data: any }
  | { kind: "bad-request"; data: any }

/**
 * Attempts to get a common cause of problems from an api response.
 *
 * @param response The api response.
 */
export function getGeneralApiProblem(response: ApiResponse<any>): GeneralApiProblem | void {
  switch (response.problem) {
    case "CONNECTION_ERROR":
      return { kind: "cannot-connect", temporary: true, data: response.data }
    case "NETWORK_ERROR":
      return { kind: "cannot-connect", temporary: true, data: response.data }
    case "TIMEOUT_ERROR":
      return { kind: "timeout", temporary: true, data: response.data }
    case "SERVER_ERROR":
      return { kind: "server", data: response.data }
    case "UNKNOWN_ERROR":
      return { kind: "unknown", temporary: true, data: response.data }
    case "CLIENT_ERROR":
      switch (response.status) {
        case 400:
          return { kind: "bad-request", data: response.data }
        case 401:
          return { kind: "unauthorized", data: response.data }
        case 403:
          return { kind: "forbidden", data: response.data }
        case 404:
          return { kind: "not-found", data: response.data }
        case 409:
          return { kind: "duplicate", data: response.data }
        default:
          return { kind: "rejected", data: response.data }
      }
    case "CANCEL_ERROR":
      return null
  }

  return null
}
