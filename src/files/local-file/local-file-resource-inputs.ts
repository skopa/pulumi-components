import * as pulumi from '@pulumi/pulumi';


/**
 * Resource input parameters
 */
export interface LocalFileResourceInputs {
    path: pulumi.Input<string>;
    content: pulumi.Input<string>;
}


/**
 * Resource provider input parameters
 */
export interface LocalFileProviderInputs {
    path: string;
    content: string;
}
