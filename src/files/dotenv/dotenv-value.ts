import * as pulumi from '@pulumi/pulumi';

/**
 * Input json
 */
export interface DotenvValue {
    [key: string]: pulumi.Input<Value>;
}

/**
 * Possible value
 */
export declare type Value = string | number | null;
