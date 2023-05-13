import * as pulumi from '@pulumi/pulumi';

import { DotenvValue, Value } from './dotenv-value';

/**
 * Component to convert json to dotenv format
 */
export class Dotenv {
    /**
     * Output for value
     * @private
     */
    private valueOutput: pulumi.Output<pulumi.Unwrap<DotenvValue>>;

    /**
     *
     * @param value
     */
    constructor(value: DotenvValue) {
        this.valueOutput = pulumi.output(value);
    }

    /**
     *
     * @param value
     */
    public static stringify(value: DotenvValue) {
        return (new Dotenv(value)).toString();
    }

    /**
     * Get dotenv string
     */
    private toString() {
        return this.valueOutput.apply(value => this.transform(value));
    }

    /**
     * Transform json to dotenv format
     *
     * @param value
     * @private
     */
    private transform(value: { [key: string]: Value }) {
        return Object.keys(value).reduce((str, key) => (str + `${ key }=${ value[key] }` + '\n'), '');
    }
}

