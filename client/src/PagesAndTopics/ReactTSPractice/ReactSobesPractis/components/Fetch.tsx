import axios from 'axios';
import { useState, useEffect } from 'react'

export const Fetch = () => {
    const [data, setData] = useState(null);
    const [data2, setData2] = useState(null);
    const [datas, setDatas] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    // Старый метод
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/todos/1')
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(json => setData(json))
            .catch(error => setError(error.message))
            .finally(() => setLoading(false));
    }, []);

    // Новый метод
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/todos');
                if (!response.ok) throw new Error('Network response was not ok');
                const json = await response.json();
                setDatas(json);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        
        fetchData();
    }, []);

    // Axios метод
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://jsonplaceholder.typicode.com/todos/2');
                setData2(response.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);
    
    if (loading) return <div>Загрузка...</div>;
    if (error) return <div>Ошибка: {error}</div>;
    
    return (
        <div>
            <p>
                Оглавление задачи 1: {data?.title}
            </p>
            <p>
                Оглавление задачи 2: {data2?.title}
            </p>
            <div>
                Список всех задач:
                {datas?.length > 0 && datas.map((item) => (
                    <div key={item.id}>{item.title}</div>
                ))}
            </div>
        </div>
    );
}