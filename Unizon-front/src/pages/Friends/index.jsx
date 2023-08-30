import React from 'react';
import axios from "../../axios";

export const Friends = () => {
    const [data, setData] = React.useState();
    const [loading, setLoading] = React.useState();
    React.useEffect(() => {
    axios
        .get(`/auth/me`)
        .then((res) => {
        console.log(res);
        setData(res.data);
        setLoading(false);
        })
        .catch((err) => {
        console.warn(err);
        })
    }, []);
    return (
        <div>
            
        </div>
    )
}