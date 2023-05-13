import * as pulumi from '@pulumi/pulumi';

/**
 * Input json
 */
interface JsonValueInterface {
    [key: string]: pulumi.Input<Value | JsonValue | JsonValue[] | never[]> | pulumi.Input<Value | JsonValue | JsonValue[] | never[]>[];
}

export declare type JsonValue<TValue = any> = pulumi.Input<Value | JsonValueInterface | JsonValueInterface[] | never[] | TValue>;

/**
 * Possible value
 */
declare type Value = string | number | null | boolean;
