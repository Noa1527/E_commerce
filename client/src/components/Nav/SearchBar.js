import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GetArticles } from "../../actions/articles.action";
import axios from 'axios';
import { Link } from 'react-router-dom';

const SearchBar = (props) => {
    const [filteredData, setFilteredData] = useState([]);
    const dispatch = useDispatch();
    const articles = useSelector((state) => state.articlesReducer)

    const handleFilter = (e) => {
        const searchWord = e.target.value
        const newFilter = articles.filter((value) => {
            return value.name.toLowerCase().includes(searchWord.toLowerCase());
        });
        if (searchWord === "") {
            setFilteredData([]);
        } else {
            setFilteredData(newFilter);
        }
    }

    useEffect(() => {
        axios.get("http://localhost:8000/api/product/list")
            .then(res => {
                dispatch(GetArticles(res.data))
            }
            ).catch(err => console.log(err))
    }, []);

    return (props.trigger) ? (
        <>
            <div className='w-70 h-10 form__search__container'>
                <form className='form__search' action="" method="get" id="search" >
                    <div className='flex__form'>
                        <input type="search" aria-label="Search" placeholder="Rechercher" onChange={handleFilter} />
                        <div onClick={() => props.setTrigger(false)} className='closeBtn'>X</div>
                    </div>
                    {filteredData.length !== 0 && (
                        <div className='searchContent'>
                            <ul>
                                {
                                    filteredData.map((value, key) => {
                                        return (
                                            <Link to={{ pathname: `/article/${value.id}`}} state={{ article_id: value.id }}>
                                                <li className='resultList'>
                                                    <p className='resultTxt'>{value.name} {value.price} €</p>
                                                </li>
                                            </Link>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    )}
                </form>
            </div>
        </>
    ) : "";
};

export default SearchBar;