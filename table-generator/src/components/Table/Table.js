import './Table.css';

export default function Table({data, onSort, sortField, sortDirection, onRowClick}){
    let thClass, currentClass;

    if(sortDirection === 'asc'){
        thClass = "arrow-down";
        currentClass = "arrow-down current";
    }else{
        thClass = "arrow-up";
        currentClass = "arrow-up current";
    }

    return (
        <table className='Table table table-sm table-striped table-hover'>
            <thead>
                <tr>
                    {/* <th>number</th> */}
                    <th 
                        className={ sortField === 'id' ? currentClass : thClass }
                        onClick={() => onSort('id')}
                    >id</th>
                    <th
                        className={ sortField === 'firstName' ? currentClass : thClass }
                        onClick={() => onSort('firstName')}
                    >firstName</th>
                    <th
                        className={ sortField === 'lastName' ? currentClass : thClass }
                        onClick={() => onSort('lastName')}
                    >lastName</th>
                    <th
                        className={ sortField === 'email' ? currentClass : thClass }
                        onClick={() => onSort('email')}
                    >email</th>
                    <th
                        className={ sortField === 'phone' ? currentClass : thClass }
                        onClick={() => onSort('phone')}
                    >phone</th>
                </tr>
            </thead>
            <tbody>
                { data.map(item => (
                    <tr key={ item.id + item.phone } onClick={() => onRowClick(item)}>
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