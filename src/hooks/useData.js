import { useState, useEffect } from "react";

export default function useData(
    shouldLoad,
    { url, options },
    initialData = [],
) {
    const [data, setData] = useState(initialData);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function getData() {
            try {
                if (shouldLoad) setLoading(true);

                
                const res = await fetch(url, options);
                if(res.ok) {
                    const fetchedData = await res.json();
                    setData(fetchedData);
                } 
                setTimeout(() => {
                    if (shouldLoad) setLoading(false);
                }, 2000);
                
            } catch (error) {
                throw error;
            }
        }

        getData();
    }, []);

    return [data, loading];
};
