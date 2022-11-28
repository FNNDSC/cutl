export class PipelinesClass {
  constructor() {
    this.client = null;
  }

  /**
   * Set this client to an existing ChRIS client instance
   *
   */
  setClient = async (client) => {
    this.client = client;
  };

  /**
   *
   * @param {} params
   */

  fetchPipelines = async (params) => {
    const registeredpipelinesList = await this.client.getPipelines(params);
    const registeredPipelines = registeredPipelinesList.getitems();

    return {
      registeredPipelines,
      registeredpipelinesList,
    };
  };

  getPipelinePlugins = async (pipelineInstance, params) => {
    const pipelinePluginsFn = pipelineInstance.getPlugins;
    const boundPipelinePluginFn = pipelinePluginsFn.bind(pipelineInstance);
    const pipelinePlugins = await fetchResource(params, boundPipelinePluginFn);
    return pipelinePlugins;
  };

  getPluginPipings = async (pipelineInstance, params) => {
    const pluginPipingsFn = pipelineInstance.getPluginPipings;
    const boundPluginPipingFn = pluginPipingsFn.bind(pipelineInstance);
    const pluginPipings = await fetchResource(params, boundPluginPipingFn);
    return pluginPipings;
  };

  getPipelineDefaultParameters = async (pipelineInstance, params) => {
    return await pipelineInstance.getDefaultParameters(params);
  };

  generatePipelineWithName = async (pipelineName) => {
    const pipelineInstanceList = await this.client.getPipelines({
      name: pipelineName,
    });
    const pipelineInstanceId = pipelineInstanceList.data[0].id;
    const pipelineInstance = await this.client.getPipeline(pipelineInstanceId);
    return pipelineInstance;
  };

  generatePipelineWithData = async (data) => {
    const pipelineInstance = this.client.createPipeline(data);
    return pipelineInstance;
  };

  fetchPipelineResources = async (pipelineInstance) => {
    const pluginPipings = await this.getPluginPipings(pipelineInstance);
    const pipelinePlugins = await this.getPipelinePlugins(pipelineInstance);
    const defaultParameters = await this.getPipelineDefaultParameters(
      pipelineInstance
    );

    return {
      pluginPipings,
      pipelinePlugins,
      defaultParameters,
    };
  };
}

export const pipelines = PipelinesClass;
