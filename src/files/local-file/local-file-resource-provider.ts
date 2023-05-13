import * as pulumi from '@pulumi/pulumi';
import * as fs from 'fs/promises';

import { CreateResult, DiffResult, ReadResult, UpdateResult } from '@pulumi/pulumi/dynamic';

import { LocalFileProviderInputs } from './local-file-resource-inputs';

export class LocalFileResourceProvider implements pulumi.dynamic.ResourceProvider {

    /**
     * Create the file
     *
     * @param inputs
     */
    async create(inputs: LocalFileProviderInputs): Promise<CreateResult> {
        await fs.writeFile(process.cwd() + inputs.path, inputs.content);

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
        const changes = !(olds.path === news.path && olds.content === news.content);

        return Promise.resolve({ changes, replaces: [ 'path' ] });
    }

    /**
     * Delete the file
     *
     * @param id
     * @param props
     */
    async delete(id: pulumi.ID, props: LocalFileProviderInputs): Promise<void> {
        return fs.rm(process.cwd() + props.path);
    }

    /**
     * Read the file
     *
     * @param id
     * @param props
     */
    async read(id: pulumi.ID, props: LocalFileProviderInputs): Promise<ReadResult> {
        const content = await fs.readFile(process.cwd() + props.path);

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
        await fs.writeFile(process.cwd() + news.path, news.content);

        return Promise.resolve({ outs: news });
    }
}
