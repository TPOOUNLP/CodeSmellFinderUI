const _local_const = {
    debug: "[GenericService]",
    post: "POST",
    get: "GET",
    headers: {
        accept:  "application/json",
        content_Type: "application/json"
    },
    path: 'http://localhost:1701'
}

class GenericService {

    /**
     * 
     * @param resource 
     */
    static async getQuery(resource: string) {
        
        try {
            let response = null
            if (resource != null) {
                response = await fetch(_local_const.path + resource, {
                    method: _local_const.get,
                    headers: {
                            Accept: _local_const.headers.accept
                        },
                        redirect: 'follow'
                    })
                }
            
           let data = (!!response)? await response.json() : null
           return data
        } catch (error) {
            console.log(error, _local_const.debug);
        }
    }

    /**
     * 
     * @param resource 
     * @param params 
     */
    static async postQuery(resource: string, params: any) {
        try {
            let response = null
            if (resource != null && params != null) {
             response = await fetch(_local_const.path + resource + "?" + "directory=" + params.directory + "&filters=" + JSON.stringify(params.filters),{
                method: _local_const.post,
                headers: {
                    Accept: _local_const.headers.accept
                },
                redirect: 'follow'
              })
            }
        let data = (!!response)? await response.json() : null
        return data
        } catch (error) {
            console.log(error, _local_const.debug);
        }
    }
}

export default GenericService;