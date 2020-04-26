import GenericService from "./GenericHttp";

class AstService {

  async getAstToPath(path: string) {
    let response = await GenericService.getQuery(path);
    console.log("obteniendo ast ...")
    return response
  }

}

export default new AstService();