const getBaseURL = () => {
  return process.env.REACT_APP_API_URL || '';
};

export const fetchAPIData = async (type) => {
  try {
    const baseURL = getBaseURL();
    const url = `${baseURL}/api/${type}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    return [];
  }
};

export const postAPIData = async (type, body) => {
  try {
    const baseURL = getBaseURL();
    const url = `${baseURL}/api/${type}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      throw new Error(`Error posting data: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    return { error: 'Failed to post data' };
  }
};
