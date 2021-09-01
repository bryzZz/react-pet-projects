export default function Table(props){
    return (
        <table className='table table-sm table-striped table-hover'>
            <thead>
                <tr>
                    {/* <th>number</th> */}
                    <th 
                        onClick={() => props.onSort('id')}
                    >id {props.sortField === 'id' ? <small>{props.sortDirection}</small> : ''}</th>
                    <th
                        onClick={() => props.onSort('firstName')}
                    >firstName {props.sortField === 'firstName' ? <small>{props.sortDirection}</small> : ''}</th>
                    <th
                        onClick={() => props.onSort('lastName')}
                    >lastName {props.sortField === 'lastName' ? <small>{props.sortDirection}</small> : ''}</th>
                    <th
                        onClick={() => props.onSort('email')}
                    >email {props.sortField === 'email' ? <small>{props.sortDirection}</small> : ''}</th>
                    <th
                        onClick={() => props.onSort('phone')}
                    >phone {props.sortField === 'phone' ? <small>{props.sortDirection}</small> : ''}</th>
                </tr>
            </thead>
            <tbody>
                { props.data.map(item => (
                    <tr key={ item.id + item.phone } onClick={() => props.onRowClick(item)}>
                        {/* <td>{ item.num }</td> */}
                        <td>{ item.id }</td>
                        <td>{ item.firstName }</td>
                        <td>{ item.lastName }</td>
                        <td>{ item.email }</td>
                        <td>{ item.phone }</td>
                    </tr>
                )) }
            </tbody>
        </table>
    );
}