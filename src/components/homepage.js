import React, { useState, useEffect } from 'react';

function Member() {
    const [data, setData] = useState(null);
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () =>{
        try {
            const response = await fetch('http://localhost:5000/member');
            if (!response.ok) {
                throw new Error('Failed to fetch data');
              }
              const jsonData = await response.json();
              setData(jsonData);
            } catch (error) {
              console.error('Error fetching data:', error);
            }
        };
    
    return(
        <div> 
            {data ? (
                <div>
                    <h1>First Name: {data.first_name}</h1>
                </div>
            ): (
                <p>Loading...</p>
            )}

        </div>
    );
            }
            export default Member;
