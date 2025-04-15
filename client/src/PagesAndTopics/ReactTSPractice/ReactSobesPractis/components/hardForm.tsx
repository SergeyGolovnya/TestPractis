import { useState } from "react";
import { StyleContainer } from '../styles/styles';

export const HardForm = () => {
    // Состояние для ввода покупателя (объект с 4 полями)
    const [buyer, setBuyer] = useState({
        name: "",
        lastName: "",
        address: "",
        jobTitle: "",
    });
    const [tour, setTour] = useState(''); // для хранения тура
    const [dateTour, setDateTour] = useState(''); // для хранения даты

    // Состояния для сохранённых (зарегистрированных) данных
    const [registeredBuyer, setRegisteredBuyer] = useState({});
    const [registeredTour, setRegisteredTour] = useState("");
    const [registeredDate, setRegisteredDate] = useState("");

    // Обработчик для всех полей покупателя buyer
    const handleSetBuyer = (e) => {
        const field = e.target.id;
        setBuyer(prev => ({
            ...prev,
            [field]: e.target.value
        }));
    }

    // Функция которая сохраняет данные из поля в useState тура tour
    const handleSetTour = (e) => {
        setTour(e.target.value);
    }

    // Функция которая сохраняет данные из поля в useState даты dateTour
    const handleSetDataTour = (e) => {
        setDateTour(e.target.value);
    }

    // Обработчик отправки формы для покупателя
    const handleSubmitBuyer = (e) => {
        e.preventDefault(); // Предотвращаем перезагрузку
        setRegisteredBuyer({...buyer}); // Сохраняем данные покупателя
        setBuyer({ name: "", lastName: "", address: "", jobTitle: "" }); // После сохранения очищаем данные покупателя
    }

    const handleSubmitTour = (e) => {
        e.preventDefault();
        setRegisteredTour(tour);
        setTour('');
    }

    const handleSubmitDateTour = (e) => {
        e.preventDefault();
        setRegisteredDate(dateTour);
        setDateTour('');
    }

    return (
        <StyleContainer>
            <form
                onSubmit={handleSubmitBuyer}
                style={{display:"flex", flexDirection: 'column'}}>
                <input
                    id="name"
                    placeholder="Введите имя"
                    value={buyer.name}
                    onChange={handleSetBuyer}
                />
                <input
                    id="lastName"
                    placeholder="Введите Фамилию"
                    value={buyer.lastName}
                    onChange={handleSetBuyer}
                />
                <input
                    id="address"
                    placeholder="Введите Адрес"
                    value={buyer.address}
                    onChange={handleSetBuyer}
                />
                <input
                    id="jobTitle"
                    placeholder="Введите Должность"
                    value={buyer.jobTitle}
                    onChange={handleSetBuyer}
                />
                <button type="submit">Зарегистрировать покупателя</button>
                
                <input
                    id="Tour"
                    placeholder="Введите название тура"
                    value={tour}
                    onChange={handleSetTour}
                />
                <button type="button" onClick={handleSubmitTour}>
                    Зарегистрировать тур
                </button>
                
                <input
                    id="DateTour"
                    placeholder="Введите дату тура"
                    value={dateTour}
                    onChange={handleSetDataTour}
                />
                <button type="button" onClick={handleSubmitDateTour}>
                    Зарегистрировать дату
                </button>
            </form>
            {/* Добавим вывод для проверки */}
            <div>
                <h3>Зарегистрированные данные:</h3>
                <p>Предварительный показ: {buyer.name} {buyer.lastName} {buyer.address} {buyer.jobTitle}</p>
                <p>
                    Покупатель: {Object.keys(registeredBuyer).length > 0
                        ? `${registeredBuyer.name} ${registeredBuyer.lastName}, ${registeredBuyer.address}, ${registeredBuyer.jobTitle}`
                        : "Ещё не зарегистрирован"}
                </p>
                <p>Предварительный показ: {tour}</p>
                <p>Тур: {registeredTour || "Ещё не зарегистрирован"}</p>
                <p>Предварительный показ: {dateTour}</p>
                <p>Дата: {registeredDate || "Ещё не зарегистрирована"}</p>
            </div>
        </StyleContainer>
    );
};