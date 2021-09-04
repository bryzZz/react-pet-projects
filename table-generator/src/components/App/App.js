import React from 'react';
import './App.css';

import _ from 'lodash';
import ReactPaginate from 'react-paginate';
import Modal from 'react-modal';

import Loader from '../Loader/Loader';
import Table from '../Table/Table';
import DetailRowView from '../DetailRowView/DetailRowView';
import DataSizeSelect from '../DataSizeSelect/DataSizeSelect';
import FilterPanel from '../FilterPanel/FilterPanel';
import AddForm from '../AddForm/AddForm';

export default class App extends React.Component{

  state = {
    loading: true,
    isDataSizeSelected: false,
    data: [],
    pages: {
      currentPage: 0,
      pageSize: 50,
    },
    term: '',
    sortDirection: 'asc',
    sortField: null,
    row: null,
    showModalForm: false
  }

  dataLinks = {
    small: 'http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}',
    big: 'http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}',
  }

  onSelectDataSize = size => {
    this.setState({isDataSizeSelected: true});
    this.loadData(size);
  }

  async loadData (size) {
    const response = await fetch(this.dataLinks[size]);

    const data = await response.json();

    // data.map((item, index) => {
    //   item.num = index;
    // });

    this.setState((state) => ({
      loading: false,
      data,
      pages: {
        ...state.pages,
        maxPage: Math.ceil(data.length / state.pages.pageSize) - 1
      }
    }));
  }

  getOnePage = (data, currentPage, pageSize) => {
    const clonedData = data.concat()

    return clonedData.splice(pageSize * currentPage, pageSize);
  }

  handlePageClick = (data) => {
    let selected = data.selected;

    this.setState((state) => ({
      pages: {
        ...state.pages,
        currentPage: selected
      }
    }));
  };

  onSort = colName => {
    const cloneData = this.state.data.concat();

    let sortDirection;
    if(this.state.sortField !== colName){
      sortDirection = 'asc';
    }else{
      sortDirection = this.state.sortDirection === 'asc' ? 'desc' : 'asc';
    }

    const orderedData = _.orderBy(cloneData, colName, sortDirection);

    this.setState({
      data: orderedData,
      sortDirection,
      sortField: colName
    });

  }

  onRowClick = row => {
    this.setState({row});
  }

  onUpdateTerm = term => {
    this.setState((state) => ({
      term,
      pages: {
        ...state.pages,
        currentPage: 0
      }
    }));
  }

  filterPosts = (items, term) => {
    if(term.length === 0) return items;

    return items.filter(({id, firstName, lastName, email, phone}) => {
      return(
        id.toString().toLowerCase().includes(term.toLowerCase())
        || firstName.toLowerCase().includes(term.toLowerCase())
        || lastName.toLowerCase().includes(term.toLowerCase())
        || email.toLowerCase().includes(term.toLowerCase())
        || phone.toLowerCase().includes(term.toLowerCase())
        );
    });
  }

  handleOpenModal = () => this.setState({showModalForm: true});
  handleCloseModal = () => this.setState({showModalForm: false});

  render(){
    const {
      loading,
      isDataSizeSelected,
      data,
      sortDirection,
      sortField,
      row,
      pages: { currentPage, pageSize },
      term,
      showModalForm
    } = this.state;

    let content;

    if(!isDataSizeSelected){
      content = <DataSizeSelect onSelectDataSize={ this.onSelectDataSize } />;
    }else{
      if(loading){
        content = <Loader />
      }else{
        const filtredData = this.filterPosts(data, term);
        const onePageData = this.getOnePage(filtredData, currentPage, pageSize);

        content = (
          <>
            <FilterPanel onUpdateTerm={ this.onUpdateTerm } />

            <button onClick={this.handleOpenModal}>Trigger Modal</button>
            {
              showModalForm 
              &&
              <AddForm />
            }

            <Table
              data={ onePageData }
              onSort={ this.onSort }
              sortDirection={ sortDirection }
              sortField={ sortField }
              onRowClick={ this.onRowClick }
            />

            {
              filtredData.length > pageSize 
              && 
              <ReactPaginate
                previousLabel={'previous'}
                previousClassName='page-item'
                previousLinkClassName='page-link'
                pageClassName='page-item'
                pageLinkClassName='page-link'
                nextLabel={'next'}
                nextClassName='page-item'
                nextLinkClassName='page-link'
                breakLabel={'...'}
                breakClassName={'break-me'}
                pageCount={Math.ceil(filtredData.length / pageSize)}
                forcePage={0}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={this.handlePageClick}
                containerClassName={'pagination justify-content-center'}
                activeClassName={'active'}
              />
            }

            { row && <DetailRowView data={ row } /> }
          </>
        );
      }
    }

    return <div className="container">{ content }</div>;
  }
}