/* eslint-disable no-param-reassign */
/* eslint-disable no-prototype-builtins */
import { fetchUtils } from "react-admin";

export function AdminHttpClient(url: string, options: any = {}): any {
  if (!options.headers) options.headers = new Headers();

  const token = localStorage.getItem("token");
  options.headers.set("Authorization", `Bearer ${token}`);

  return fetchUtils.fetchJson(url, options);
}
