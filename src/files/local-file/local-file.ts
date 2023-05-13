import * as pulumi from '@pulumi/pulumi';

import { LocalFileResourceInputs } from './local-file-resource-inputs';
import { LocalFileResourceProvider } from './local-file-resource-provider';

export class LocalFile extends pulumi.dynamic.Resource {

    /**
     * File path
     */
    public readonly path!: pulumi.Output<string>;

    /**
     * File content
     */
    public readonly content!: pulumi.Output<string>;

    /**
     * Local file resource
     *
     * @param name
     * @param props
     * @param opts
     */
    constructor(name: string, props: LocalFileResourceInputs, opts?: pulumi.CustomResourceOptions) {
        super(new LocalFileResourceProvider(), name, props, opts);
    }
}
