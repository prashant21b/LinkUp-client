import Avatar from "react-avatar";
import React, { useState, useContext } from 'react';
import { userContext } from "../../context";
import { useRouter } from "next/router";
import { Button, FormControl, InputGroup } from "react-bootstrap";

export const People = ({ people, handleFollow }) => {
    const [state, setState] = useContext(userContext);
    const router = useRouter();
    const [search, setSearch] = useState("");

    // Filter people based on search input
    const filteredPeople = people.filter(person =>
        person.name.toLowerCase().includes(search.toLowerCase()) ||
        person.username.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            <h6 className="text-center">Suggestions For You</h6>
            <InputGroup className="mb-3">
                <FormControl
                    placeholder="Search People"
                    aria-label="Search People"
                    aria-describedby="basic-addon2"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </InputGroup>
            {filteredPeople.length > 0 ? (
                filteredPeople.map(person => (
                    <div key={person._id} className="d-flex align-items-center justify-content-between mb-3">
                        <div className="d-flex align-items-center">
                            {person.image ? (
                                <Avatar
                                    name={person.name}
                                    size="40"
                                    round={true}
                                    className="mr-3"
                                    src={person.image.url}
                                />
                            ) : (
                                <Avatar
                                    round="20px"
                                    name={person.name[0]}
                                    className="mb-2"
                                    size="40"
                                />
                            )}
                            <div className="mx-2">
                                <h6 className="mb-0 text-primary" onClick={()=>router.push(`/chat/${person._id}`)} style={{cursor:"pointer"}}>{person.username}</h6>
                                <p className="text-muted mb-0" onClick={()=>router.push(`/chat/${person._id}`)} style={{cursor:"pointer"}}>{person.name}</p>
                            </div>
                        </div>
                        <Button
                            variant="primary"
                            size="sm"
                            onClick={() => handleFollow(person._id)}
                        >
                            Follow
                        </Button>
                    </div>
                ))
            ) : (
                <p className="text-center text-muted">No match found</p>
            )}
        </div>
    );
};
