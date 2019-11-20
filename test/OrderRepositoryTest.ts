

import {RepositoryFactory, RepositoryHandler} from "../src/index"
import {OrderRepository} from "./OrderRepository"
import {Order} from "./Order"
import {mock, instance,verify,deepEqual,strictEqual, when} from "ts-mockito"
import {expect} from 'chai'
import {describe,it} from "mocha"

class RepoHandlerImpl implements RepositoryHandler {
    execute(sql: string, ...params: any): Promise<any> {
        throw "Should be mocked";
    }
}

describe( __filename, () => {
    it("findById", async () => {
		//mock
        let mockedHandler:RepoHandlerImpl = mock(RepoHandlerImpl);
        let handlerInstance:RepoHandlerImpl = instance(mockedHandler);
        //prepare data
        var rt:Order[] = [];
        when(mockedHandler.execute('select * from "order" where "id" = ?',deepEqual([1]))).thenResolve(rt);
        //test
        var orderRepository = RepositoryFactory.newRepository(OrderRepository, handlerInstance);
        var result = await orderRepository.findById(1);        
        //verify data
        expect(result).to.equal(rt);
        //verify mock
        verify(mockedHandler.execute('select * from "order" where "id" = ?',deepEqual([1]))).called();        
    });
});