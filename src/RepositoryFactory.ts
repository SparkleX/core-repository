import * as Query from "./Query"
export interface RepositoryHandler {
     execute(sql:string, ...params:any):Promise<any>;
}

export class RepositoryFactory {
    public static newRepository<REPO>(c: new (...param:any) => REPO,  callback:RepositoryHandler, param?:any[]): REPO {
		var par:any[] = [null].concat(param);
        var face:REPO = new (Function.prototype.bind.apply(c, par));//c.apply(null, param);
        var proxyHandler = new MyProxy(callback);
        var p = new Proxy(face, proxyHandler);
        return p;
    }
} 

class RepositoryData {
    handler: RepositoryHandler;
    sql:string;
    constructor(sql:string, handler:RepositoryHandler) {
        this.sql = sql;
        this.handler = handler
    }
}

class MyProxy implements ProxyHandler<any> {
    private handler: RepositoryHandler;
    constructor(handler:RepositoryHandler) {
        this.handler = handler
    }
    get? (target: any, propKey:PropertyKey, receiver: any): any{
        var func = propKey.toString();
		var sql = Reflect.getMetadata(Query.QUERY_METADATA_KEY, target, func);
		if(sql) {
	        var repoData = new RepositoryData(sql, this.handler);
			return proxyFunction.bind(repoData);
		}else {
			return target[propKey];
		}
    } 
}
async function proxyFunction (...params:any):Promise<any[]> {
    var data = await this.handler.execute(this.sql,params);
    return data;
}