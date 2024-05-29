import React, { createContext, useEffect, useState } from 'react';
import {useFetch} from "../books.js";


export const ShopContext = createContext(null);

export const ShopContextProvider = (props) => {
    const {data} = useFetch();
    const BOOKS = data.books;

    const [cartItems, setCartItems] = useState([]);

    const [totalBooks, setTotalBooks] = useState(BOOKS.length);
    const [start, setStart] = useState(1);
    const [end, setEnd] = useState(1);
    const [first, setFirst] = useState(0);
    const [last, setLast] = useState(5);
    const booksPerPage = 10;
    const totalPaginas = Math.ceil(totalBooks / booksPerPage);
    const [Pagina_Atual, setPagina_Atual] = useState(1);
    const [clickedNumber, setClickedNumber] = useState('');
    const [categoria, setCategoria] = useState('titulo');
    const [inputValue, setInputValue] = useState('');
    const [orderSelecionada, setOrderSelecionada] = useState('');
    const [value, setValue] = useState('');
    const [scoreFiltro, setscoreFiltro] = useState({ min: 0, max: 5 });
    const [priceFiltro, setpriceFiltro] = useState({ min: 0, max: 10000});
    const [selectedOptions, setSelectedOptions] = useState({});
    const [categoriaValue, setCategoriaValue] = useState('');
    const [autorValue, setAutorValue] = useState('');
    const [enterPressed, setEnterPressed] = useState(false);


    useEffect(() => {
        setPagina_Atual(1);
        setClickedNumber(1);
    }, [totalBooks]);

    const handleClick = (number) => {
        setPagina_Atual(number);
        setClickedNumber(number);
    };

    const handleNextClick = () => {
        const nextStart = end + 1;
        const nextEnd = Math.min(end + 5, totalPaginas);
        setStart(nextStart);
        setEnd(nextEnd);
        if (Pagina_Atual < totalPaginas)
            setPagina_Atual((prevPage) => prevPage + 1);
        else {
            setPagina_Atual(totalPaginas);
        }
        setClickedNumber(Pagina_Atual + 1);
    };

    const handlePrimeiraPagina = () => {
        setPagina_Atual(1);
        setClickedNumber(1);
    };



    const CalculoStartEndIndex = () => {
        setStart(0);
        setEnd(totalPaginas);
    };

    const CalculoStartEndLivro = () => {
        setFirst((Pagina_Atual - 1) * booksPerPage + 1);
        setLast(Pagina_Atual * booksPerPage);
    };

    const updateTotalBooksLength = (total) => {
        setTotalBooks(total);
    };

    const handleReverterEscolha = (key) => {
        setSelectedOptions(prevOptions => {
            const updatedOptions = { ...prevOptions };
            delete updatedOptions[key];
            if (key === 'autor') {
                setAutorValue('');
            } else if (key === 'categoria') {
                setCategoriaValue('');
            } else if (key === 'price') {
                setpriceFiltro({ min: 0, max: 10000 });
            }
            else if (key === 'ranking') {
                setscoreFiltro({ min: 0, max: 5 });
            } else if (key === 'price') {
                setOrderSelecionada('');
            } else if (key === 'ranking') {
                setOrderSelecionada('');
            } else if (key === 'titulo') {
                setInputValue('');
            } else if (key === 'all') {
                setInputValue('');
                setCategoriaValue('');
                setAutorValue('');
                setpriceFiltro({ min: 0, max: 10000 });
                setscoreFiltro({ min: 0, max: 5 });
                setOrderSelecionada('');
            }
            return updatedOptions;
        });
    };


    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            const inputValue = event.target.value;
            setInputValue(inputValue);
            setEnterPressed(true);
        }
    };

    const handleCategoriaChange = (event) => {
        const selectedCategoria = event.target.value;
        setCategoria(selectedCategoria);
    };

    const handleInputChange = (event) => {
        setValue(event.target.value);
        console.log(event.target.value);
    };


    const handleOrderSelecionadaPreco = (order) => {
        setOrderSelecionada(order);
        setSelectedOptions(prevOptions => ({
            ...prevOptions,
            price: `Preço: ${order}`
        }));
    };

    const handleOrderSelecionadaRanking = (order) => {
        setOrderSelecionada(order);
        setSelectedOptions(prevOptions => ({
            ...prevOptions,
            ranking: `Ranking: ${order}`
        }));
    };


    const handleScoreFiltro = (min, max) => {
        setscoreFiltro({ min, max });
        setSelectedOptions(prevOptions => ({
            ...prevOptions,
            ranking: `Ranking: ${min}-${max}`
        }));
    };

    const handlePriceFiltro = (min, max) => {
        setpriceFiltro({ min, max });
        setSelectedOptions(prevOptions => ({
            ...prevOptions,
            price: `Preço: ${min}-${max}`
        }));
    };

    const handleAutorChange = (event) => {
        setAutorValue(event);
        setCategoria('autor');
        setSelectedOptions(prevOptions => ({
            ...prevOptions,
            autor: `Autor: ${event}`
        }));
    };

    const handleCategoriasChange = (event) => {
        setCategoriaValue(event);
        setCategoria('categoria');
        setSelectedOptions(prevOptions => ({
            ...prevOptions,
            categoria: `Categoria: ${event}`
        }));
    };



    const numberCartItems = () => {
        let total = 0;
        cartItems.forEach((item) => {total += item.quantity});
        return total;
    };

    const addToCart = (itemId) => {
        if(cartItems.length === 0 || !cartItems.find((item) => item.id === itemId)){
            setCartItems((prevState) => [...prevState, {id: itemId, quantity: 1}])
        }
        else{
            setCartItems(cartItems.map((item) => {
                if (item.id === itemId){
                    return{...item, quantity: item.quantity +1}
                } else {
                    return item
                }
            }))}
    };

    const removeFromCart = (itemId) => {
        if(cartItems.find((item) => { return item.id === itemId}).quantity <= 1){
            setCartItems(cartItems.filter(item => item.id !== itemId))
        } else{
            setCartItems(cartItems.map((item) => {
                if (item.id === itemId){
                    return{...item, quantity: item.quantity -1}
                } else {
                    return item
                }
            }))
        }
    };

    const updateCartItemCount = (newAmount, itemId) => {
        if(newAmount<=0){
            setCartItems(cartItems.filter(item => item.id !== itemId))
        } else {
            setCartItems(cartItems.map((item) => {
                if (item.id===itemId){
                    return{...item, quantity: newAmount}
                } else {
                    return item
                }
            }))
        }}

    const getTotalCartAmount = () => {
        let total = 0;
        cartItems.forEach((item) => {
            total += BOOKS.find((book) => book.id === item.id).price * item.quantity
        })
        return total;
    };

    const deleteCart = () => {
        setCartItems([]);
    };

    const contextValue = {
        cartItems,
        addToCart,
        removeFromCart,
        updateCartItemCount,
        deleteCart,
        getTotalCartAmount,
        numberCartItems,
        start,
        end,
        Pagina_Atual,
        clickedNumber,
        totalPaginas,
        handleClick,
        handlePrimeiraPagina,
        CalculoStartEndIndex,
        first,
        last,
        updateTotalBooksLength,
        CalculoStartEndLivro,
        handleNextClick,
        handleCategoriaChange,
        handleInputChange,
        handleKeyPress,
        categoria,
        inputValue,
        scoreFiltro,
        setscoreFiltro,
        priceFiltro,
        setpriceFiltro,
        handleScoreFiltro,
        handlePriceFiltro,
        handleAutorChange,
        handleCategoriasChange,
        selectedOptions,
        setSelectedOptions,
        categoriaValue,
        autorValue,
        value,
        orderSelecionada,
        setOrderSelecionada,
        handleOrderSelecionadaPreco,
        handleOrderSelecionadaRanking,
        handleReverterEscolha,
        enterPressed,
        setEnterPressed

    };

    return <ShopContext.Provider value={contextValue}>{props.children}</ShopContext.Provider>;
};