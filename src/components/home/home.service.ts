import ApiRequest from "../../core/api-request"
export class HomeService{
    public static async search(name: string){
        const url = `character/?name=${name}`;
        const result = await ApiRequest.get(url);
        const data: any = await result.json();
        let error: string;
        if(data.error){
            error = data.error
            return error
        }
        if(data.results.length){
            return data.results
        }else{
            error = " Nothing found"
            return error
        }
        
    }
}