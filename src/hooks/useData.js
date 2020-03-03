import { useState, useEffect } from "react";

export default function useData(
    shouldLoad,
    { url, options },
    initialData = []
) {
    const [data, setData] = useState(initialData);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getData() {
            try {
                if (shouldLoad) setLoading(true);

                const res = await fetch(url, options);
                if (res.ok) {
                    const fetchedData = await res.json();
                    setData(fetchedData);
                }
            } catch (error) {
                throw error;
            }
        }

        getData()
            .then(() => {
                if(shouldLoad){
                    setLoading(false);
                }
            });
    }, []);

    return [data, loading];
}
