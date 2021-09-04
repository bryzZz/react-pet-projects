export default function DataSizeSelect({onSelectDataSize}){
    return (
      <div style={{marginTop: '10%'}} className="DataSizeSelect d-grid gap-2 col-4 mx-auto">
        <h1 className="text-center">Select table size</h1>
        <button
          className="DataSizeSelect__small btn btn-outline-primary"
          onClick={ () => onSelectDataSize('small') }
        >small</button>
        <button
          className="DataSizeSelect__big btn btn-outline-primary"
          onClick={ () => onSelectDataSize('big') }
        >big</button>
      </div>
    );
  }