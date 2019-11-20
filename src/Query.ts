import "reflect-metadata"


export const QUERY_METADATA_KEY = "query";
export function Query(sql: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        Reflect.defineMetadata(QUERY_METADATA_KEY, sql, target.__proto__, descriptor.value.name);
    };
}