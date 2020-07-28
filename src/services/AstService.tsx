import GenericService from "./GenericHttp";

class AstService {

  /**
   * 
   * @param path 
   */
  async getAstToPath(path: string) {
    let response = await GenericService.getQuery(path);
    console.log("obteniendo ast ...")
    return response
  }

  /**
   * 
   * @param path 
   */
  async postAstToPath(path: string, params: any) {
    let response = await GenericService.postQuery(path, params);
    console.log("obteniendo ast ...")
    return response
  }

  public processResults( result:any , path: string) {
    
      if (!result) return false;

      const jsonData: any = result.reduce((data: any, item:any) => {

        item.relativePath = item.path.replace(path, "");
        if ( !data[item.path] ) {
          data[item.path] = [];
        }
        data[item.path].push(item);
        return data;
      }, {});
      
      return jsonData;
  }

}

export default new AstService();