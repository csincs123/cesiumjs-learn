export const fetchLocalJson = async (path) => {
    try {
        const response = await fetch(path);
        if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
        }
        let value = await response.json();
        return value
    } catch (error) {
        console.error('Fetch error:', error);
    }
};

 