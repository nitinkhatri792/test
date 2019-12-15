import {AppConstant} from "../AppConstant"
export default class ApiRequest{
    public static get(url: string) {
        return fetch(`${AppConstant.apiUrl}/${url}`, {
          method: "GET",
        });
    }
}

  