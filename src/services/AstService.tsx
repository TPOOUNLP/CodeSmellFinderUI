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

}

export default new AstService();