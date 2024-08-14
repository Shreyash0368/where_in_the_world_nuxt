export const fetchApiData = async (url) => {
  const data = useState(() => ref(null)); 
  const error = ref(null);

  try {
    data.value = await $fetch(url);
  } catch (err) {
    error.value = err.message || 'Something went wrong!';
  } 

  return {
    data,
    error,
  };
};
