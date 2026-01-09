import React, { useState } from 'react'
import { Form } from 'react-bootstrap';

interface ISearchQueryProp{
    setSearchQuery: (value: string) => void;
}

const SearchQuery = ({setSearchQuery}: ISearchQueryProp) => {
    const [query, setQuery] = useState("");

    const querySubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSearchQuery(query);    
    }

    return (
        <div className='my-3'>

            <h5>Search Bar</h5>
            <Form onSubmit={querySubmit}>
                <Form.Group>
                    <Form.Control
                        type='text'
                        placeholder='Enter needed title'
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
            </Form>
        </div>
    )
}

export default SearchQuery