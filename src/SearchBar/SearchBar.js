import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import './SearchBar.css';
import { Spinner } from 'react-bootstrap';

const SearchBar = () => {
  const [isFocus, setIsFocus] = useState(false);
  const [data, setData] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [isLoading,setIsLoading]=useState(false);

  const fetchData = async () => {
      setIsLoading(true);
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      setData(response.data);
      setInterval(()=>{
        setIsLoading(false)
      },3000)
  };

  useEffect(() => {
    fetchData();
  }, []);

  const inputRef = useRef();

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    filterData(value);
  
    if (value === '') {
      setSelectedData(null);
    }
  };
  const handleInputClick = () => {
    setIsFocus(true);
    filterData(inputValue);
  };

  const handleSuggestionClick = (suggestion) => {
  setSelectedData(suggestion);
  setInputValue(suggestion.name);
};

  const filterData = (value) => {
    const filtered = data.filter((suggestion) =>
      suggestion.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };
 

  return (
      <div id="inputBar">
        <Form className="d-flex w-75 m-5">
          <Form.Control
            type="search"
            value={inputValue}
            placeholder="Name"
            className="me-2"
            aria-label="Search"
            onClick={handleInputClick}
            onChange={handleInputChange}
            ref={inputRef}
          />
        </Form>
        {isFocus && (
          <div className="container shadow-lg w-75">
            {isLoading?(
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>)
                :
                (
                filteredData.map((suggestion) => (
                    <div
                        key={suggestion.id}
                        id="suggestion_list"
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="p-3 border"
                    >
                        {suggestion.name}
                    </div>
            ))
            )}
          </div>
        )}
        {selectedData && (
          <div className="popup">
            <div className="popup-content">
              <h3>{selectedData.name}</h3>
            </div>
          </div>
        )}
      </div>
  );
};
export default SearchBar;




