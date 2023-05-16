import * as pulumi from '@pulumi/pulumi';
import * as fs from 'fs';

import { CreateResult, DiffResult, ReadResult, UpdateResult } from '@pulumi/pulumi/dynamic';

import { LocalFileProviderInputs } from './local-file-resource-inputs';

export class LocalFileResourceProvider implements pulumi.dynamic.ResourceProvider {

    /**
     * Create the file
     *
     * @param inputs
     */
    async create(inputs: LocalFileProviderInputs): Promise<CreateResult> {
        fs.writeFileSync(process.cwd() + inputs.path, inputs.content);

        return Promise.resolve({ id: inputs.path, outs: inputs });
    }

    /**
     * Check the differences
     *
     * @param id
     * @param olds
     * @param news
     */
    async diff(id: pulumi.ID, olds: LocalFileProviderInputs, news: LocalFileProviderInputs): Promise<DiffResult> {
        const changes: boolean = !(olds.path === news.path && olds.content === news.content);
        const replaces: string[] = olds.path !== news.path ? [ 'path' ] : [];

        return Promise.resolve({ changes, replaces, deleteBeforeReplace: true });
    }

    /**
     * Delete the file
     *
     * @param id
     * @param props
     */
    async delete(id: pulumi.ID, props: LocalFileProviderInputs): Promise<void> {
        fs.rmSync(process.cwd() + props.path, { force: true });

        return Promise.resolve(undefined);
    }

    /**
     * Read the file
     *
     * @param id
     * @param props
     */
    async read(id: pulumi.ID, props: LocalFileProviderInputs): Promise<ReadResult> {
        const content = fs.readFileSync(process.cwd() + props.path).toString();

        return Promise.resolve({ id, props: { path: props.path, content } });
    }

    /**
     * Update the file
     *
     * @param id
     * @param olds
     * @param news
     */
    async update(id: pulumi.ID, olds: LocalFileProviderInputs, news: LocalFileProviderInputs): Promise<UpdateResult> {
        fs.writeFileSync(process.cwd() + news.path, news.content);

        return Promise.resolve({ outs: news });
    }
}
