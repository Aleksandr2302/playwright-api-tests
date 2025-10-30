// Get all products
export const getProducts = async (request) => {
  const response = await request.get('https://api.restful-api.dev/objects');
  return response;
};

// Get single product
export const getSingleProductById = async (request, id) => {
  const response = await request.get(`https://api.restful-api.dev/objects/${id}`);
  return response;
};

// Get products by id
export const getListOfProductById = async (request, id1, id2, id3) => {
  const response = await request.get(
    `https://api.restful-api.dev/objects?id=${id1}&id=${id2}&id=${id3}`,
  );
  return response;
};

// Add product
export const addProduct = async (request, objectData) => {
  const response = await request.post('https://api.restful-api.dev/objects', {
    data: objectData,
  });
  return response;
};

// Update whole product by id
export const updateAllProductById = async (request, id, data) => {
  const response = await request.put(`https://api.restful-api.dev/objects/${id}`, { data });
  return response;
};

// Update part of product by id
export const updateSomePartOfProductById = async (request, id, data) => {
  const response = await request.patch(`https://api.restful-api.dev/objects/${id}`, { data });
  return response;
};

// delete product by id
export const deleteProductById = async (request, id) => {
  const response = await request.delete(`https://api.restful-api.dev/objects/${id}`);
  return response;
};
