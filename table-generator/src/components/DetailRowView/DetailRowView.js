import './DetailRowView.css';

export default function DetailRowView({data}){
    return (
        <div className="DetailRowView">
            <p>Выбран пользователь <b>{data.firstName + ' ' + data.lastName}</b></p>
            <p>
                Описание:
                <textarea className="form-control" defaultValue={ data.description } />
            </p>
            <p>Адрес проживания: <b>{ data.address.streetAddress }</b></p>
            <p>Город: <b>{ data.address.city }</b></p>
            <p>Провинция/штат: <b>{ data.address.state }</b></p>
            <p>Индекс: <b>{ data.address.zip }</b></p>
        </div>
    );
}