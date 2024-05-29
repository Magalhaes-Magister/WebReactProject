import { useEffect, useState } from 'react';

export const useFetch = () => {
    const [data, setData] = useState({ books: [] });
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/books');
                const books_data = await response.json();
                setData(books_data.books);
            } catch (error) {
                setError(error);
                console.error('Erro ao buscar os livros:', error);
            } finally {
                console.log(data);
            }
        };

        fetchData();
    }, []);

    return { data, error };
};