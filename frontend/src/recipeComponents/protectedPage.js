import React, {useState, useEffect } from "react";
import useAxios from "../utils/useAxios";


export default function ProtectedPage() {
    const [res, setRes] = useState("");
    const api = useAxios();

    useEffect(()=>{
        const fetchData = async () => {
            try {
                const response = await api.get("test");
                setRes(response.data.response);
            } catch {
                setRes("Something went wrong");
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1> ProtectedPage</h1>
            <p>{res}</p>
        </div>
    )
}