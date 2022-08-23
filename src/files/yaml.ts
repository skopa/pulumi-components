import * as pulumi from '@pulumi/pulumi';
import * as yaml from 'yaml'


/**
 * Component to convert json to dotenv format
 */
export class Yaml {
    /**
     * Output for value
     * @private
     */
    private valueOutput: pulumi.Output<pulumi.Unwrap<YamlValue>>;

    /**
     *
     * @param value
     */
    constructor(value: YamlValue) {
        this.valueOutput = pulumi.output(value);
    }

    /**
     *
     * @param value
     */
    public static stringify(value: YamlValue) {
        return (new Yaml(value)).toString();
    }

    /**
     * Get dotenv string
     */
    private toString() {
        return this.valueOutput.apply(value => (new yaml.Document(value)).toString());
    }
}


/**
 * Input json
 */
interface YamlValue {
    [key: string]: pulumi.Input<YamlValue | object | Value>;
}


/**
 * Possible values
 */
declare type Value = string | number | null;
