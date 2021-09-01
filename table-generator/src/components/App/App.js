import React from 'react';
import './App.css';

import _ from 'lodash';

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
      currentPageData: null,
      minPage: 0,
      maxPage: null,
      pageSize: 50,
    },
    term: '',
    sortDirection: 'asc',
    sortField: null,
    row: null
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

  getOnePage = data => {
    const { pageSize, currentPage } = this.state.pages;
    const clonedData = data.concat()

    return clonedData.splice(pageSize * currentPage, pageSize);
  }

  changePage = n => {
    const { currentPage, minPage, maxPage } = this.state.pages;

    if(currentPage + n >= minPage && currentPage + n <= maxPage){
      this.setState((state) => ({
        pages: {
          ...state.pages,
          currentPage: state.pages.currentPage + n
        }
      }));
    }
  }

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
    this.setState({
      term
    })
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
        )
    });
  }

  render(){
    const {
      loading,
      isDataSizeSelected,
      data,
      sortDirection,
      sortField,
      row,
      pages: { maxPage, minPage, currentPage, pageSize },
      term
    } = this.state;

    let content;

    if(!isDataSizeSelected){
      content = <DataSizeSelect onSelectDataSize={ this.onSelectDataSize } />;
    }else{
      if(loading){
        content = <Loader />
      }else{
        const filtredData = this.filterPosts(data, term);
        const onePageData = this.getOnePage(filtredData);

        content = (
          <>
            <FilterPanel onUpdateTerm={ this.onUpdateTerm } />

            <AddForm />

            <Table
              data={ onePageData }
              onSort={ this.onSort }
              sortDirection={ sortDirection }
              sortField={ sortField }
              onRowClick={ this.onRowClick }
            />

            {
              data.length > pageSize 
              && 
              <div className="pagination d-flex justify-content-end">
                <button
                  className="btn btn-outline-primary"
                  disabled={ minPage === currentPage }
                  onClick={ () => this.changePage(-1) }
                >prev</button>
                <button
                  className="btn btn-outline-primary"
                  disabled={ maxPage === currentPage }
                  onClick={ () => this.changePage(1) }
                >next</button>
              </div>
            }

            { row && <DetailRowView data={ row } /> }
          </>
        );
      }
    }

    return <div className="container">{ content }</div>;
  }
}