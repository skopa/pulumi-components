import { readFileSync } from 'fs';
import * as pulumi from '@pulumi/pulumi';

/**
 * Useful to replace files variables
 */
export class ContentVariables {

    /**
     * Output for value
     * @private
     */
    private valueOutput: pulumi.Output<pulumi.Unwrap<VariablesValue>>;

    /**
     *
     * @param content
     * @param value
     */
    constructor(private content: string, value: VariablesValue) {
        this.valueOutput = pulumi.output(value);
    }

    /**
     *
     * @param file
     * @param variables
     * @param encoding
     */
    public static fileVariables(file: string, variables: VariablesValue, encoding?: BufferEncoding) {
        return ContentVariables.contentVariable(readFileSync(file).toString(), variables, encoding);
    }

    /**
     *
     * @param content
     * @param variables
     * @param encoding
     */
    public static contentVariable(content: string, variables: VariablesValue, encoding?: BufferEncoding) {
        return (new ContentVariables(content, variables)).toString(encoding);
    }

    /**
     * Get dotenv string
     */
    private toString(encoding?: BufferEncoding) {
        return this.valueOutput.apply(
            variables => Buffer.from(this.getVariableString(variables)).toString(encoding)
        );
    }

    /**
     * Unprovided variables will be replaced with empty string
     * @param variables
     * @private
     */
    private getVariableString(variables: { [key: string]: Value }) {
        /**
         * Get regex
         * @param key
         */
        const regex = (key: string) => new RegExp(`\\$\\{ *${key} *\}`, 'gmi');
        /**
         * Replacer
         * @param content
         * @param key
         * @param value
         */
        const replacer = (content: string, key: string, value: string) => content.replace(regex(key), value);
        /**
         * Reducer
         * @param content
         * @param key
         */
        const reducer = (content: string, key: string) => replacer(content, key, `${ variables[key] }`);

        return replacer(Object.keys(variables).reduce(reducer, this.content), '.*', '');
    }
}


/**
 * Input json
 */
interface VariablesValue {
    [key: string]: pulumi.Input<Value>;
}


/**
 * Possible values
 */
declare type Value = string | number | null;
