
import React from 'react'
import { Form } from "react-bootstrap";
import type { IPostFilterProps, TPostDataStatus } from '../../../types/Posts';

const PostFilter = (
    {selectedPostStatus,setSelectedPostStatus}
    :IPostFilterProps) => {
        
    const selectedStatusHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedPostStatus(e.target.value as TPostDataStatus );
    }

    return (
        <>
            <h5>Filter By Status</h5>

            <Form.Select value={selectedPostStatus} onChange={selectedStatusHandler}>
                <option value="all">All Status</option>
                <option value="published">Publish</option>
                <option value="draft">Draft</option>
                <option value="block">Block</option>
            </Form.Select>
        </>
    )
}

export default PostFilter