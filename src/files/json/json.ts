import * as pulumi from '@pulumi/pulumi';

import { JsonValue } from './json-value';

/**
 * Component to convert json to dotenv format
 */
export class Json {
    /**
     * Output for value
     * @private
     */
    private valueOutput: pulumi.Output<pulumi.Unwrap<JsonValue>>;

    /**
     *
     * @param value
     */
    constructor(value: JsonValue) {
        this.valueOutput = pulumi.output(value);
    }

    /**
     *
     * @param value
     */
    public static stringify<TValue>(value: JsonValue<TValue>) {
        return (new Json(value)).toString();
    }

    /**
     * Get dotenv string
     */
    private toString() {
        return this.valueOutput.apply(value => JSON.stringify(value));
    }
}

