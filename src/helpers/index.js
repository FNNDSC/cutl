async function fetchResource(params, callbackFn) {
  let resourceList = await callbackFn(params);
  let resource = [];
  if (resourceList.getItems()) {
    resource = resourceList.getItems();
  }
  while (resourceList.hasNextPage) {
    try {
      params.offset += params.limit;
      resourceList = await callbackFn(params);
      if (resourceList.getItems) {
        resource.push(...resourceList.getItems());
      }
    } catch (error) {
      console.error(error);
    }
  }
  return resource;
}
