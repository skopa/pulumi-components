import * as pulumi from '@pulumi/pulumi';

/**
 * Possible values
 */
declare type Value = string | number | null;


/**
 * Input json
 */
export interface YamlValue {
    [key: string]: pulumi.Input<YamlValue | object | Value>;
}
