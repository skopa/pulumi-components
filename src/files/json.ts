import * as pulumi from '@pulumi/pulumi';

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

/**
 * Input json
 */
interface JsonValueInterface {
    [key: string]: pulumi.Input<Value | JsonValue | JsonValue[] | never[]> | pulumi.Input<Value | JsonValue | JsonValue[] | never[]>[];
}

declare type JsonValue<TValue = any> = pulumi.Input<Value | JsonValueInterface | JsonValueInterface[] | never[] | TValue>;

/**
 * Possible value
 */
declare type Value = string | number | null | boolean;
