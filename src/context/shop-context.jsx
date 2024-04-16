import React, { createContext, useEffect, useState } from 'react';
import { BOOKS } from "../books.js";

export const ShopContext = createContext(null);

export const ShopContextProvider = (props) => {
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
    const [scoreFiltro, setscoreFiltro] = useState({ min: 0, max: 5 });
    const [priceFiltro, setpriceFiltro] = useState({ min: 0, max: 30 });
    const [selectedOption, setSelectedOption] = useState(null);
    const [categoriaValue, setCategoriaValue] = useState('');
    const [autorValue, setAutorValue] = useState('');

    const updatePage = (newStart, newEnd) => {
        setStart(newStart);
        setEnd(newEnd);
    };

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
    };

    const handlePrimeiraPagina = () => {
        setPagina_Atual(1);
        setClickedNumber(1);
    };

    const handleProximaPagina = () => {
        const ProximaPagina = Pagina_Atual + 1;
        if (ProximaPagina <= totalPaginas) {
            setPagina_Atual(ProximaPagina);
            setClickedNumber(ProximaPagina);
        }
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

    const handleCategoriaChange = (event) => {
        const selectedCategoria = event.target.value;
        setCategoria(selectedCategoria);
    };

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
        console.log(event.target.value);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            console.log('Enter key pressed');   
        }
    };

    const handleScoreFiltro = (min, max) => {
        setscoreFiltro({ min, max });
        setSelectedOption(`Ranking: ${min}-${max}`);
    };

    const handlePriceFiltro = (min, max) => {
        setpriceFiltro({ min, max });
        setSelectedOption(`Preço: ${min}-${max}`);
    };

    const handleAutorChange = (event) => {
        setAutorValue(event); 
        setCategoria('autor');
        setSelectedOption(`Autor: ${event}`);
    };

    const handleCategoriasChange = (event) => {
        setCategoriaValue(event);
        setCategoria('categoria');
        setSelectedOption(`Categoria: ${event}`);
    };


    const numberCartItems = () => {
        let total = 0;
        cartItems.forEach((item) => { total += item.quantity });
        return total;
    };

    const getTotalCartAmount = () => {
        let total = 0;
        cartItems.forEach((item) => {
            total += BOOKS.find((book) => book.id === item.id).price * item.quantity;
        });
        return total;
    };

    const addToCart = (itemId) => {
        if (cartItems.length === 0 || !cartItems.find((item) => item.id === itemId)) {
            setCartItems((prevState) => [...prevState, { id: itemId, quantity: 1 }]);
        }
        else {
            setCartItems(cartItems.map((item) => {
                if (item.id === itemId) {
                    return { ...item, quantity: item.quantity + 1 };
                } else {
                    return item;
                }
            }));
        }
    };

    const removeFromCart = (itemId) => {
        if (cartItems.find((item) => { return item.id === itemId }).quantity <= 1) {
            setCartItems(cartItems.filter(item => item.id !== itemId));
        } else {
            setCartItems(cartItems.map((item) => {
                if (item.id === itemId) {
                    return { ...item, quantity: item.quantity - 1 };
                } else {
                    return item;
                }
            }));
        }
    };

    const updateCartItemCount = (newAmount, itemId) => {
        setCartItems(cartItems.map((item) => {
            if (item.id === itemId) {
                return { ...item, quantity: newAmount };
            } else {
                return item;
            }
        }));
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
        updateTotalBooksLength,
        updatePage,
        start,
        end,
        Pagina_Atual,
        clickedNumber,
        totalPaginas,
        handleClick,
        handlePrimeiraPagina,
        handleProximaPagina,
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
        selectedOption,
        categoriaValue,
        autorValue,
        

    };

    return <ShopContext.Provider value={contextValue}>{props.children}</ShopContext.Provider>;
};
