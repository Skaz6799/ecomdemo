import React, { useEffect, useState } from 'react';
import RangeSliderInput from 'react-range-slider-input';

interface Product {
    id: number;
    title: string;
    price: number;
    category: string;
    thumbnail: string;
    brand: string;
    availabilityStatus: string;
}

const Products = () => {
    const categories = [
        "beauty",
        "fragrances",
        "furniture",
        "groceries",
        "home-decoration",
        "kitchen-accessories",
        "laptops"
    ];

    const brands = [
        "Apple",
        "Annibale Colombo",
        "Calvin Klein",
        "Nike",
    ];

    const avalables = [
        "In Stock",
        "Low Stock",
        "Out of Stock",
    ];

    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [total, setTotal] = useState<number | undefined>();
    const [limit, setLimit] = useState<number | undefined>();
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
    const [availability, setAvailability] = useState<string | null>(null);
    const [value, setValue] = useState<[number, number]>([0, 7500]);
    const [selectedOption, setSelectedOption] = useState("Most Popular");
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMenuOpen = () => {
        setIsMenuOpen(false);
    };
    const handleMenuClose = () => {
        setIsMenuOpen(true);
    };

    const handleSelect = (option: string) => {
        setSelectedOption(option);
    };

    const handleInput = (newValue: [number, number]) => {
        setValue(newValue);
    };

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(prevCategory => (prevCategory === category ? null : category));
    };

    const handleBrandChange = (brand: string) => {
        setSelectedBrand(prevBrand => (prevBrand === brand ? null : brand));
    };

    const handleAvailability = (available: string) => {
        setAvailability(prevAvailable => (prevAvailable === available ? null : available));
    };

    useEffect(() => {
        const fetchProducts = async () => {
            let url = `${process.env.NEXT_PUBLIC_API}/products?limit=0`;      // getting all products 
            if (selectedOption === "Ascending") {
                url += `&sortBy=title&order=asc`;                          // getting all products and sorting in ascending order  
            } else if (selectedOption === "Descending") {
                url += `&sortBy=title&order=desc`;                          // getting all products and sorting in descinding order
            }

            const res = await fetch(url);
            const data = await res.json();
            setAllProducts(data.products);
            setTotal(data.products.length);
            setProducts(data.products);
        };

        fetchProducts();
    }, [selectedOption]);

    useEffect(() => {
        // Filter products based on selected criteria
        const filteredProducts = allProducts.filter(product => {
            const inCategory = selectedCategory ? product.category === selectedCategory : true;        // getting product based on category
            const inBrand = selectedBrand ? product.brand === selectedBrand : true;                    // getting product based on brands
            const inAvailable = availability ? product.availabilityStatus === availability : true;      // getting product based on availability
            const inPriceRange = product.price >= value[0] && product.price <= value[1];                // getting product based on price range
            return inCategory && inBrand && inAvailable && inPriceRange;
        });

        setProducts(filteredProducts.slice(0, 30));                                                        // showing only 30 products out of all products
        setLimit(filteredProducts.length > 30 ? 30 : filteredProducts.length);                            // default limit is 30 but if it is less than 30 then showing limit as filtered products length
    }, [allProducts, selectedCategory, selectedBrand, availability, value]);

    return (
        <div className='productsmain px-3 container'>
            <div className={`profilters ${isMenuOpen ? '' : 'proshow'}`}>
                <div className='categorynav1' onClick={handleMenuClose}>
                    <i className='bi bi-x navmenu'></i>
                </div>
                <div className='procategory mb-5'>
                    <h3 className="filtertitle">CATEGORIES</h3>
                    {categories.map((category) => (                                        // using loops for mutiple rendering of same types
                        <label key={category}>
                            <input
                                type="checkbox"
                                checked={selectedCategory === category}
                                onChange={() => handleCategoryChange(category)}
                            />
                            {category}
                        </label>
                    ))}
                </div>
                <div className='procategory mb-5'>
                    <h3 className="filtertitle mb-2">PRICE</h3>
                    <RangeSliderInput
                        min={0}
                        max={7500}
                        step={5}
                        defaultValue={value}
                        onInput={handleInput}
                    />
                    <p className='mt-2'>Selected range: ${value[0]} - ${value[1]}</p>
                </div>
                <div className='procategory mb-5'>
                    <h3 className="filtertitle mb-2">BRANDS</h3>
                    {brands.map((brand) => (
                        <label key={brand}>
                            <input
                                type="checkbox"
                                checked={selectedBrand === brand}
                                onChange={() => handleBrandChange(brand)}
                            />
                            {brand}
                        </label>
                    ))}
                </div>
                <div className='procategory mb-5'>
                    <h3 className="filtertitle mb-2">AVAILABILITY</h3>
                    {avalables.map((avalable) => (
                        <label key={avalable}>
                            <input
                                type="checkbox"
                                checked={availability === avalable}
                                onChange={() => handleAvailability(avalable)}
                            />
                            {avalable}
                        </label>
                    ))}
                </div>
            </div>
            <div className='products'>
                <div className='producthead'>
                    <div className='categorynav' onClick={handleMenuOpen}>
                        <i className='bi bi-list navmenu'></i>
                    </div>
                    <h5>Showing {limit} of {total} Products</h5>
                    <div className='sort'>
                        <h5>Sort By:</h5>
                        <div className="dropdown">
                            <a
                                className="btn btn-secondary dropdown-toggle ddstyle"
                                href="#"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                {selectedOption}
                            </a>

                            <ul className="dropdown-menu">
                                <li>
                                    <a
                                        className="dropdown-item"
                                        href="#"
                                        onClick={() => handleSelect("Most Popular")}
                                    >
                                        Most Popular
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="dropdown-item"
                                        href="#"
                                        onClick={() => handleSelect("Ascending")}
                                    >
                                        Ascending
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="dropdown-item"
                                        href="#"
                                        onClick={() => handleSelect("Descending")}
                                    >
                                        Descending
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='product'>
                    {products.map((product) => (
                        <div key={product.id} className='product-item'>
                            <img src={product.thumbnail} alt={product.title} className='product-img' />
                            <p className='product-category'>{product.category}</p>
                            <h3 className='product-title'>{product.title}</h3>
                            <p className='product-price'>${product.price}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Products;
