import { useEffect, useState } from 'react';

export const useFetch = () => {
    const [data, setData] = useState({ books: [] });
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/books', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
            const books_data = await response.json();
            setData(books_data);
        } catch (error) {
            setError(error);
            console.error('Erro ao buscar os livros:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return { data, error };
};

export const postData = async (body) => {
    try {
        const response = await fetch('http://127.0.0.1:5000/cart', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });
        return await response.json();
    } catch (error) {
        console.error('Erro ao enviar os dados:', error);
        throw error;
    }
};
