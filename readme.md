# Repository Pattern for Type Script

---
Repository Declareation

```ts
import {Query} from "core-repository";
import {Order} from "./Order"

export class OrderRepository{
    @Query('select * from "order" where "id" = ?')
    public async findById(id:Number):Promise<Order[]> {return null};
}
```

Implement Handler

```ts
class RepoHandlerImpl implements RepositoryHandler {
    execute(sql: string, ...params: any): Promise<any> {
        // Your real implementation
    }
}
```

Use repository

```ts
        var orderRepository = RepositoryFactory.newRepository(OrderRepository, handlerInstance);
        var result = await orderRepository.findById(1);
```
