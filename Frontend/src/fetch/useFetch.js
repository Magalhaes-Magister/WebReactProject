import {useEffect, useState} from 'react';

export const useFetch = async () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = async() => {
    try {
      const response = await fetch('http://127.0.0.1:5000/books');
      setData(await response.json());
    } catch (error) {
      setError(error);
      console.error('Erro ao buscar os livros:', error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return {data, error}
};
